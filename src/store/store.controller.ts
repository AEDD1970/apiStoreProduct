import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GetStoreDto } from './dto/get-store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll(@Query() findAll: GetStoreDto) {
    return this.storeService.findAll(findAll);
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.storeService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(_id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.storeService.delete(_id);
  }
}
