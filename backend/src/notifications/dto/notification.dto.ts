import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { IsValidObjectId } from "src/utils/customValidator/isValidObjectId.validator";

export class NotificationDto {
    @IsNotEmpty()
    @IsString()
    receiver_id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    @IsValidObjectId()
    id: string;
}
