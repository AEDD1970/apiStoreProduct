import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({minlength: 3})
  city: string;

  @Prop()
  address: string;

  @Prop({ default: new Date() })
  dateCreate: Date;

}

export const StoreSchema = SchemaFactory.createForClass(Store);
