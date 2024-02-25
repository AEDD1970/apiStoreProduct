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

  //esto lo queme para no integrar ningun bucket solo para que gaurde a nivel visual para todos en al db
  @Prop({default : "https://img.freepik.com/vector-gratis/carro-tienda-edificio-tienda-dibujos-animados_138676-2085.jpg"}) 
  img: string

  @Prop({ default: new Date() })
  dateCreate: Date;

}

export const StoreSchema = SchemaFactory.createForClass(Store);
