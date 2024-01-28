import { MESSAGE_RETURN } from '../../utils/_messages';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';


export class CreateProductDto {
    @IsNotEmpty({ message: MESSAGE_RETURN.required })
  @IsString({ message: MESSAGE_RETURN.string })
  readonly name: string;

  @IsNotEmpty({ message: MESSAGE_RETURN.required })
  @IsNumber()
  readonly price: number;

  @IsString({ message: MESSAGE_RETURN.required })
  readonly type: string;
}
