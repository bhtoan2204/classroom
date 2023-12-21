import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsValidObjectId } from "src/utils/customValidator/isValidObjectId.validator";

export class UpdateGradeCompositionDto {
    @ApiProperty({
        description: 'Class id'
    })
    @IsNotEmpty()
    @IsString()
    @IsValidObjectId()
    class_id: string;

    @ApiProperty({
        description: 'Old name'
    })
    @IsNotEmpty()
    @IsString()
    oldName: string;

    @ApiProperty({
        description: 'Name of the grade composition',
        example: 'Quiz 1',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Scale of the grade composition',
        example: 100,
    })
    @IsNotEmpty()
    scale: number;
}
