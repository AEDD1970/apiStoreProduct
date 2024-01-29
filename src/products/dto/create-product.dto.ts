import { ApiProperty } from '@nestjs/swagger';
import { MESSAGE_RETURN } from '../../utils/_messages';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';


export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    type: String,
  })
    @IsNotEmpty({ message: MESSAGE_RETURN.required })
  @IsString({ message: MESSAGE_RETURN.string })
  readonly name: string;

  @ApiProperty({
    description: 'precio del producto',
    type: Number,
  })
  @IsNotEmpty({ message: MESSAGE_RETURN.required })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'Tipo de producto puede usar esats dos opciones "PERISHABLE", "NONPERISHABLE"',
    type: Number,
  })
  @IsString({ message: MESSAGE_RETURN.required })
  readonly type: string;

 
}
