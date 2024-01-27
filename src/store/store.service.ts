import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './schema/store.schema';
import { Model } from 'mongoose';
import { countries } from 'src/utils/_ISO-countries';
import { GetStoreDto } from './dto/get-store.dto';

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store.name) private storeModel: Model<StoreDocument>) { }

  async create(createStoreDto: CreateStoreDto) {
    try {
      const { name, city, address } = createStoreDto;
      const cityToUpper = city.toUpperCase()
      const validateCodeCity = countries.map(item => item.code)
      console.log(!validateCodeCity.includes(cityToUpper), cityToUpper.length, cityToUpper.length < 3, "que es")
      //validate code city 
      if (cityToUpper.length > 3) {
        return { message: `the city code input ${city} wants to see three character`, status: 404 }
      }
      if (!validateCodeCity.includes(cityToUpper)) {
        return {
          message: 'code city invalid  ', status: 404, data: {
            codeCity: countries
          }
        };
      }
      // find exit store register
      const strore = await this.storeModel.findOne({ name, city });
      if (!strore) {
        //save store
        const saveStore = await this.storeModel.create({
          name,
          city,
          address
        });
        if (saveStore) {
          return { message: 'create user', status: 201 };
        } else {
          return { message: 'ups error create store', status: 500 };
        }
      }
      else {
        return { message: 'There is already a store with that name in that city', status: 404 };
      }
    } catch (error) {
      console.log(error)
      return { message: 'ups error server', status: 500 };
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
        return { message: 'not have data', status: 404 };
      } else {
        return {
          data: getAllStore,
          page_total: page_total,
          status: 200,
        };
      }
    } catch (error) {
      return { message: 'ups error server', status: 500 };
    }
  }

  async findOne(id: string) {
    console.log(id)
    try {
      const getStore = await this.storeModel.findById(id)
      return {
        status: 200,
        data: {
          store: getStore
        },
        message: "sucess"
      }

    } catch (error) {
      return { message: 'ups error server', status: 500 };
    }
  }

  async update(_id: string, updateStoreDto: UpdateStoreDto) {
    const {name, city, address } = updateStoreDto
     return await this.storeModel.updateOne({_id}, { 
      $set: {
          "name" : name,
          "city": city,
          "address": address
      }}
    );
  }

  async delete(_id: string) {
    try {
      const deleteStore = await this.storeModel.deleteOne({ _id })
      const { deletedCount } = deleteStore
      if (deletedCount === 1) {
        return { message: "delete store", status: 200 }
      }
      else {
        return { message: 'ups, something went wrong when deleting the store', status: 404 };
      }

    } catch (error) {
      return { message: 'ups error server', status: 500 };
    }
  }
}
