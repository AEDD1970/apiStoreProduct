import { MESSAGE_RETURN } from '../../utils/_messages';
import {
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';


export class CreateStoreDto {
    @IsNotEmpty({ message: MESSAGE_RETURN.required })
  @IsString({ message: MESSAGE_RETURN.string })
  readonly name: string;

  @IsString({ message: MESSAGE_RETURN.string })
  readonly address: string;

  @MinLength(3, { message: `${MESSAGE_RETURN.minLength} code city` })
  readonly city: string;
}
