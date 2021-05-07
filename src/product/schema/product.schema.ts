import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CaracteristicDto } from '../dto/caracteristics.dto';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  imageURL: string;
  @Prop()
  readonly caracteristics: CaracteristicDto[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
