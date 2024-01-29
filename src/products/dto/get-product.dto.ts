import {
    IsNotEmpty,
  
  } from 'class-validator';
import { MESSAGE_RETURN } from 'src/utils/_messages';
  
  
  export class GetProductDto {
   
    @IsNotEmpty({message: `limit ${MESSAGE_RETURN.required}`})
    readonly limit: string;
  
    @IsNotEmpty({message: `pageNumber ${MESSAGE_RETURN.required}`})
    readonly pageNumber: string;
  
  }
  