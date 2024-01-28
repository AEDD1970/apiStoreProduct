import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products, ProductsDocument } from './schema/products.schema';
import { validationProduct } from 'src/utils/logic/global/validateBussines';
import { GetProductDto } from './dto/get-product.dto';
@Injectable()
export class ProductsService {
  constructor(@InjectModel(Products.name) private productModel: Model<ProductsDocument>) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const { name, type, price } = createProductDto;
      const cityToUpper = type.toUpperCase()

      //validate type product
      const errors = await validationProduct(cityToUpper)
      console.log(errors)
      if (errors) {
        throw errors
      }
      // find exit product register
      const strore = await this.productModel.findOne({ name });
      if (!strore) {
        //save product
        const saveStore = await this.productModel.create({
          name,
          type: cityToUpper,
          price
        });
        if (saveStore) {
          return { message: 'create product', status: "OK" };
        } else {
          return { message: 'ups error create product', status: "SERVICE_UNAVAILABLE" };
        }
      }
      else {
        return { message: 'the product is already registered', status: "BAD_REQUEST" };
      }
    } catch (error) {
      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }

  async findAll(findAll: GetProductDto) {
    const { limit, pageNumber } = findAll;
    try {
      const count = await this.productModel.countDocuments({}).exec();
      const page_total = Math.floor((count - 1) / limit) + 1;

      const getAllStore = await this.productModel
        .find()
        .sort({ _id: 1 })
        .skip(pageNumber > 0 ? (pageNumber - 1) * limit : 0)
        .limit(limit)
        .exec();

      if (getAllStore.length === 0) {
        throw { message: 'not have data', status: "BAD_REQUEST" };
      } else {
        return {
          data: getAllStore,
          page_total: page_total,
          status: "OK",
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

 async findOne(id: string) {
    try {
      const getProduct = await this.productModel.findById(id, { __v: 0 })
      if (!getProduct) {
        throw { message: 'product not exist', status: "NOT_FOUND" };
      }
      return {
        data: {
          product: getProduct
        },
        message: "sucess"
      }

    } catch (error) {
      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    try {
      const { name, type, price } = updateProductDto
      const typeToUpper = type.toUpperCase()
      //validate type product
      const errors = await validationProduct(typeToUpper)
      console.log(errors)
      if (errors) {
        throw errors
      }

      const setProduct = await this.productModel.updateOne({ _id }, {
        $set: {
          "name": name,
          "type": type,
          "price": price
        }
      });
      if (setProduct) {
        throw { message: 'update product', status: "OK" };
      }
    } catch (error) {
      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }

  async delete(_id: string) {
    try {
      const deleteProduct = await this.productModel.deleteOne({ _id })
      const { deletedCount } = deleteProduct
      if (deletedCount === 1) {
        throw { message: "delete product" }
      }
      else {
        throw { message: 'ups, something went wrong when deleting the product', status: "BAD_REQUEST" };
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
