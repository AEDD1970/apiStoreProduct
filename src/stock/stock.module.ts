import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, Stockchema } from './schema/stock.schema';
import { Store, StoreSchema } from 'src/store/schema/store.schema';
import { Products, ProductsSchema } from 'src/products/schema/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Stock.name,
        schema: Stockchema,
      },
      {
        name: Store.name,
        schema: StoreSchema,
      },
      {
        name: Products.name,
        schema: ProductsSchema,
      },
    ]),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
