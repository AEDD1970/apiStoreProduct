import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockDto, ParamsStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Stock, StockDocument } from './schema/stock.schema';
import { Store, StoreDocument } from 'src/store/schema/store.schema';
import { Products, ProductsDocument } from 'src/products/schema/products.schema';


@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    @InjectModel(Products.name) private productModel: Model<ProductsDocument>
  ) { }

  async addStoreToProduct(prams: ParamsStockDto, createStockDto: CreateStockDto) {
    try {
      const { stock } = createStockDto;
      const { product, store } = prams
      // find exists store 
      const stockStoreToProduct = await this.stockModel.findOne({ idStore: store, idProduct: product })
      if (stockStoreToProduct) {
        throw { message: `you already added this ${product} in the store`, status: "BAD_REQUEST" };
      }
      const getStore = await this.storeModel.findById({ _id: store })
      if (!getStore) {
        throw { message: 'ups not exists store', status: "BAD_REQUEST" };
      } else {
        const saveStoreToProduct = await this.stockModel.create({
          stock,
          idProduct: product,
          idStore: store
        });
        if (saveStoreToProduct) {
          throw { message: 'create stock', status: "OK" };
        } else {
          throw { message: 'ups error create stock', status: "SERVICE_UNAVAILABLE" };
        }
      }
    } catch (error) {
      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }


  async findStoresFromProduct() {

    try {
      const getAllStock = await this.storeModel.aggregate(
        [
          {
            $lookup: {
              from: "stocks",
              localField: "_id",
              foreignField: "idStore",
              as: "stockData"
            }
          },
          {
            $match: {
              stockData: { $exists: true, $not: { $size: 0 } }
            }
          },
          {
            $unwind: "$stockData"
          },
          {
            $lookup: {
              from: "products",
              localField: "stockData.idProduct",
              foreignField: "_id",
              as: "productData"
            }
          },
          {
            $unwind: "$productData"
          },
          {
            $project: {
              _id: 1, // Incluye el ID de la tienda
              idProduct: "$productData._id",
              name: "$productData.name",
              stock: "$stockData.stock"
            }
          }
        ])
      if (getAllStock.length === 0) {
        throw { message: 'not have data', status: "BAD_REQUEST" };
      } else {
        throw {
          data: getAllStock,
          status: "OK",
          message: 'success'
        };
      }
    } catch (error) {
      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }

  async updateStoresFromProduct(prams: ParamsStockDto, updateStockDto: UpdateStockDto) {
    try {
      const { product, store } = prams
      const { stock } = updateStockDto

      const validateIDProduct = mongoose.isValidObjectId(product)
      const validateIDStock = mongoose.isValidObjectId(store)

      if (!validateIDProduct) {
        throw { message: `the id:${product} product is not valid`, status: "BAD_REQUEST" };
      }
      if (!validateIDStock) {
        throw { message: `the id:${store} store is not valid`, status: "BAD_REQUEST" };
      }
      const productWhitStock = await this.stockModel.find({ idProduct: product }, { _id: 1 })
      const arrayIdsStock = productWhitStock.map(item => new mongoose.Types.ObjectId(item._id))

      // Prepara las operaciones bulkWrite
      const bulkOperations = arrayIdsStock.map((id) => ({
        updateOne: {
          filter: { _id: id },
          update: { stock: stock },
        },
      }));

      const setStock = await this.stockModel.bulkWrite(bulkOperations, { ordered: false })
      if(setStock.modifiedCount){
        throw { message: 'stock of store modify', status: "OK" };
      }

    } catch (error) {
      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }

  async findStoreFromProduct(prams: ParamsStockDto) {


    try {
      const { product, store } = prams

      const validateIDProduct = mongoose.isValidObjectId(product)
      const validateIDStock = mongoose.isValidObjectId(store)

      if (!validateIDProduct) {
        throw { message: `the id:${product} product is not valid`, status: "BAD_REQUEST" };
      }
      if (!validateIDStock) {
        throw { message: `the id:${store} store is not valid`, status: "BAD_REQUEST" };
      }

      const getStockStore = await this.storeModel.aggregate(
        [{
          $match: {
            _id: new mongoose.Types.ObjectId(store)
          }
        },

        {
          $lookup: {
            from: "stocks",
            localField: "_id",
            foreignField: "idStore",
            as: "stockData"
          }
        },
        {
          $match: {
            "stockData": { $ne: [] }
          }
        },
        {
          $project: {
            _id: 0,
            __v: 0
          }
        }
        ])


      const getStockProduct = await this.productModel.aggregate(
        [{
          $match: {
            _id: new mongoose.Types.ObjectId(product)
          }
        },

        {
          $lookup: {
            from: "stocks",
            localField: "_id",
            foreignField: "idProduct",
            as: "stockData"
          }
        },
        {
          $match: {
            "stockData": { $ne: [] }
          }
        }
        ])

      if (getStockProduct.length) {
        if (getStockStore.length === 0) {
          throw { message: 'not have data', status: "BAD_REQUEST" };
        } else {
          throw {
            data: getStockStore,
            status: "OK",
            message: 'success'
          };
        }
      } else {

        throw { message: `the id:${product} product is not valid`, status: "BAD_REQUEST" };
      }


    } catch (error) {

      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }


  async deleteStoresFromProduct(prams: ParamsStockDto) {
    try {
      const { product, store } = prams

      const validateIDProduct = mongoose.isValidObjectId(product)
      const validateIDStock = mongoose.isValidObjectId(store)

      if (!validateIDProduct) {
        throw { message: `the id:${product} product is not valid`, status: "BAD_REQUEST" };
      }
      if (!validateIDStock) {
        throw { message: `the id:${store} store is not valid`, status: "BAD_REQUEST" };
      }

      const productWhitStock = await this.stockModel.find({ idStore: store })

      if (productWhitStock.length) {
        const deleteStore = await this.storeModel.deleteOne({ store })
        const { deletedCount } = deleteStore
        if (deletedCount === 1) {
          throw { message: "delete store" }
        }
        else {
          throw { message: 'ups, something went wrong when deleting the store', status: "BAD_REQUEST" };
        }
      } else {
        throw { message: `the id:${store} store does not offer any products`, status: "BAD_REQUEST" };
      }
    } catch (error) {
      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }

}
