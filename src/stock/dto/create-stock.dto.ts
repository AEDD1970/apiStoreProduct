import { IsString, IsNumber } from "class-validator";
import { MESSAGE_RETURN } from "src/utils/_messages";

export class CreateStockDto {

  @IsNumber( )
  readonly stock: number
}

export class ParamsStockDto{
    @IsString({ message: MESSAGE_RETURN.required })
    readonly product: string;
  
    @IsString({ message: MESSAGE_RETURN.required })
    readonly store: string;
} 