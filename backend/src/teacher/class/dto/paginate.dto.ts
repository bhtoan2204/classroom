import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class PaginateDto {
    @IsOptional()
    @IsInt()
    @Min(1, { message: 'Page should be greater than 0' })
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(5, { message: 'PerPage should be greater than or equal to 5' })
    @Max(50, { message: 'PerPage should be less than or equal to 20' })
    itemPerPage?: number;
}
