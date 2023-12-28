import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
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
        description: 'index 1'
    })
    @IsNotEmpty()
    @IsNumber()
    source_index: number;

    @ApiProperty({
        description: 'index 2'
    })
    @IsNotEmpty()
    @IsNumber()
    destination_index: number;
}
