import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/storeProduts'),
    StoreModule,
    ProductsModule,
    StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
