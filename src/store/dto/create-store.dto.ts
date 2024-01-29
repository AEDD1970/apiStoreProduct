import { ApiProperty } from '@nestjs/swagger';
import { MESSAGE_RETURN } from '../../utils/_messages';
import {
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';


export class CreateStoreDto {
  @ApiProperty({
    description: 'nombre de la tienda',
    type: String,
  })
    @IsNotEmpty({ message: MESSAGE_RETURN.required })
  @IsString({ message: MESSAGE_RETURN.string })
  readonly name: string;

  @ApiProperty({
    description: 'direccion de la tienda',
    type: String,
  })
  @IsString({ message: MESSAGE_RETURN.string })
  readonly address: string;

  @ApiProperty({
    description: 'ciudad de la tienda',
    type: String,
  })
  @MinLength(3, { message: `${MESSAGE_RETURN.minLength} code city` })
  readonly city: string;
}
