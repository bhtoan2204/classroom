import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsValidObjectId } from "src/utils/customValidator/isValidObjectId.validator";

export class InviteEmailDto {
    @ApiProperty({
        description: 'Class id'
    })
    @IsNotEmpty()
    @IsString()
    @IsValidObjectId()
    class_id: string;

    @ApiProperty({
        description: 'Class token',
        example: 'This is a class token',
    })
    @IsString()
    @IsNotEmpty()
    class_token: string;

    @ApiProperty({
        description: 'Class token',
        example: 'This is a class token',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
