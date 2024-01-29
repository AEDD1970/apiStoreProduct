import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";
import { MESSAGE_RETURN } from "src/utils/_messages";

export class CreateStockDto {

  @IsNumber()
  readonly stock: number
}

export class ParamsStockDto {
  @ApiProperty({
    description: 'debe ingresar el id del producto ejemplo: 65b7ab8b04dc902e116da3bd',
    type: String,
  })
  @IsString({ message: MESSAGE_RETURN.required })
  readonly product: string;

  @ApiProperty({
    description: 'debe ingresar el id de la tienda ejemplo: 65b7a853432e846a9e9eef04',
    type: String,
  })
  @IsString({ message: MESSAGE_RETURN.required })
  readonly store: string;
} 