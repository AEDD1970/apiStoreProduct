import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { MESSAGE_RETURN } from 'src/utils/_messages';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
    @IsNotEmpty({ message: MESSAGE_RETURN.required })
    @IsString({ message: MESSAGE_RETURN.string })
    readonly _id: string;
}
