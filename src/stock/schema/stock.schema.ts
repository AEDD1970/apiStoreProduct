import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true})
  idProduct: string;

  @Prop({type: Number})
  stock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true})
  idStore: string;

  @Prop({ default: new Date() })
  dateCreate: Date;

}

export const Stockchema = SchemaFactory.createForClass(Stock);
