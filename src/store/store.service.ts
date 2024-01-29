import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './schema/store.schema';
import { Model } from 'mongoose';
import { GetStoreDto } from './dto/get-store.dto';
import { validationCity } from 'src/utils/logic/global/validateBussines';

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store.name) private storeModel: Model<StoreDocument>) { }

  async create(createStoreDto: CreateStoreDto) {
    try {
      const { name, city, address } = createStoreDto;
      const cityToUpper = city.toUpperCase()

      //validate code city 
      const errors = await validationCity(cityToUpper)
      if (errors) {
        throw errors
      }
      // find exit store register
      const strore = await this.storeModel.findOne({ name, city });
      if (!strore) {
        //save store
        const saveStore = await this.storeModel.create({
          name,
          city: cityToUpper,
          address
        });
        if (saveStore) {
          throw { message: 'create store', status: "CREATED" };
        } else {
          throw { message: 'ups error create store', status: "SERVICE_UNAVAILABLE" };
        }
      }
      else {
        throw { message: 'There is already a store with that name in that city', status: 'BAD_REQUEST' };
      }
    } catch (error) {
      if (!error.message) {
        throw new HttpException('ups error server', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const { status, ...message } = error
      throw new HttpException(message, HttpStatus[status as keyof typeof HttpStatus])
    }
  }


  async findAll(findAll: GetStoreDto) {
    const { limit, pageNumber } = findAll;
    try {
      const count = await this.storeModel.countDocuments({}).exec();
      const page_total = Math.floor((count - 1) / limit) + 1;

      const getAllStore = await this.storeModel
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
      const getStore = await this.storeModel.findById(id, { __v: 0 })
      if (!getStore) {
        throw { message: 'store not exist', status: "NOT_FOUND" };
      }
      return {
        data: {
          store: getStore
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

  async update(_id: string, updateStoreDto: UpdateStoreDto) {
    try {
      const { name, city, address } = updateStoreDto
      const cityToUpper = city.toUpperCase()
      //validate code city 
      const errors = await validationCity(cityToUpper)
      if (errors) {
        throw errors
      }
      const setStore = await this.storeModel.updateOne({ _id }, {
        $set: {
          "name": name,
          "city": cityToUpper,
          "address": address
        }
      });
      if (setStore) {
        throw { message: 'update store', status: "OK" };
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
      const getStore = await this.storeModel.findById(_id, { __v: 0 })
      if (!getStore) {
        throw { message: 'store not exist', status: "NOT_FOUND" };
      }
      const deleteStore = await this.storeModel.deleteOne({ _id })
      const { deletedCount } = deleteStore
      if (deletedCount === 1) {
        throw { message: "delete store" }
      }
      else {
        throw { message: 'ups, something went wrong when deleting the store', status: "BAD_REQUEST" };
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
