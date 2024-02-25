import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto, ParamsStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStocktDto } from './dto/get-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('/products/:product/stores/:store')
  create(@Param() _ids: ParamsStockDto, @Body() createStockDto: CreateStockDto) {
    return this.stockService.addStoreToProduct(_ids , createStockDto);
  }

  @Get('/products/stores')
  findAll()  {
    return this.stockService.findStoresFromProduct();
  }

  @Get('/products/:product/stores/:store')
  findOne(@Param() _ids: ParamsStockDto) {
    return this.stockService.findStoreFromProduct(_ids);
  }
  @Patch('/products/:product/stores/:store')
  update(@Param() _ids: ParamsStockDto, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.updateStoresFromProduct(_ids, updateStockDto);
  }

  @Delete('/products/:product/stores/:store')
  remove(@Param() _ids: ParamsStockDto) {
    return this.stockService.deleteStoresFromProduct(_ids);
  }
}
