import {
    IsNotEmpty,
    IsNumber,
  } from 'class-validator';
import { MESSAGE_RETURN } from 'src/utils/_messages';
  
  
  export class GetProductDto {
      @IsNotEmpty({ message: MESSAGE_RETURN.required })
    @IsNumber()
    readonly limit: number;
  
    @IsNotEmpty({ message: MESSAGE_RETURN.required })
    @IsNumber()
    readonly pageNumber: number;
  
  }
  