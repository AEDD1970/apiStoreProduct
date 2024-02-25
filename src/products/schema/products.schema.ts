import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({type: Number})
  price: number;

  @Prop()
  type: string;

  @Prop({default: "https://themes.pixelstrap.com/fastkart/assets/images/product/category/1.jpg"})
  img: string

  @Prop({ default: new Date() })
  dateCreate: Date;
  

}

export const ProductsSchema = SchemaFactory.createForClass(Products);
