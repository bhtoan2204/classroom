import { IsNotEmpty, IsString } from "class-validator";
import { IsValidObjectId } from "src/utils/customValidator/isValidObjectId.validator";

export class MarkFinalNotificationDto {
    @IsNotEmpty()
    @IsString()
    class_id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    @IsValidObjectId()
    id: string;
}
