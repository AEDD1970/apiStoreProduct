import { MESSAGE_RETURN } from '../../utils/_messages';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';


export class GetStoreDto {
   
  @IsNumber()
  readonly limit: number;

  @IsNumber()
  readonly pageNumber: number;

}
