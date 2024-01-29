import {
    IsNotEmpty,
  
  } from 'class-validator';
import { MESSAGE_RETURN } from 'src/utils/_messages';
import { ApiProperty } from '@nestjs/swagger';
  
  export class GetProductDto {
    @ApiProperty({
      description: 'limite de paginas',
      type: String,
    })
    @IsNotEmpty({message: `limit ${MESSAGE_RETURN.required}`})
    readonly limit: string;
  
    @ApiProperty({
      description: 'Numero de paginas',
      type: String,
    })
    @IsNotEmpty({message: `pageNumber ${MESSAGE_RETURN.required}`})
    readonly pageNumber: string;
  
  }
  