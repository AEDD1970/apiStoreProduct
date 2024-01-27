import { MESSAGE_RETURN } from '../../utils/_messages';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';


export class GetStoreDto {
    @IsNotEmpty({ message: MESSAGE_RETURN.required })
  @IsNumber()
  readonly limit: number;

  @IsNotEmpty({ message: MESSAGE_RETURN.required })
  @IsNumber()
  readonly pageNumber: number;

}
