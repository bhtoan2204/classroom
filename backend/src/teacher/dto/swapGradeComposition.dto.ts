import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsValidObjectId } from "src/utils/customValidator/isValidObjectId.validator";

export class SwapGradeCompositionDto {
    @ApiProperty({
        description: 'Class id'
    })
    @IsNotEmpty()
    @IsString()
    @IsValidObjectId()
    class_id: string;

    @ApiProperty({
        description: 'First name'
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'Second name'
    })
    @IsNotEmpty()
    @IsString()
    secondName: string;
}
