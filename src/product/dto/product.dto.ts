import { CaracteristicDto } from './caracteristics.dto';

export class ProductDto {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly caracteristics: CaracteristicDto[];
}
