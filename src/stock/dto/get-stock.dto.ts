import {
    IsNotEmpty,
    IsNumber,
  } from 'class-validator';
import { MESSAGE_RETURN } from 'src/utils/_messages';
  
  
  export class GetStocktDto {
      @IsNotEmpty({ message: MESSAGE_RETURN.required })
    readonly limit: number;
  
    @IsNotEmpty({ message: MESSAGE_RETURN.required })
    readonly pageNumber: number;
  
  }
  