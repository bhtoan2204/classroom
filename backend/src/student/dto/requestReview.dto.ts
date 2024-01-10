import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsValidObjectId } from "src/utils/customValidator/isValidObjectId.validator";

export class RequestReviewDto {
    @ApiProperty({ description: "class id" })
    @IsNotEmpty()
    @IsString()
    @IsValidObjectId()
    class_id: string;

    @ApiProperty({ description: "grade composition name" })
    @IsNotEmpty()
    @IsString()
    gradeCompo_name: string;

    @ApiProperty({ description: "expected grade" })
    @IsNotEmpty()
    @IsNumber()
    expected_grade: string;

    @ApiProperty({ description: "explaination" })
    @IsNotEmpty()
    explaination: string;
}