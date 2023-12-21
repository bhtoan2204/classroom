/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { GradeReviewService } from "../service/gradeReview.service";
import { User } from "src/utils/schema/user.schema";
import { CommentGradeReviewDto } from "src/teacher/dto/commentGradeReview.dto";
import { MarkFinalDescistionDto } from "src/teacher/dto/markFinalDescistion.dto";
export declare class GradeReviewController {
    private readonly gradeService;
    constructor(gradeService: GradeReviewService);
    viewGradeReview(currentUser: User, params: any): Promise<import("@nestjs/common").HttpException | (import("mongoose").Document<unknown, {}, import("../../../utils/schema/gradeReview.schema").GradeReviewDocument> & import("../../../utils/schema/gradeReview.schema").GradeReview & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    viewGradeReviewDetail(currentUser: User, params: any): Promise<import("@nestjs/common").HttpException | {
        student: import("mongoose").Document<unknown, {}, import("src/utils/schema/user.schema").UserDocument> & User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        gradeReview: import("mongoose").Document<unknown, {}, import("../../../utils/schema/gradeReview.schema").GradeReviewDocument> & import("../../../utils/schema/gradeReview.schema").GradeReview & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    commentGradeReview(currentUser: User, dto: CommentGradeReviewDto): Promise<import("@nestjs/common").HttpException | {
        message: string;
    }>;
    markFinalGrade(user: User, dto: MarkFinalDescistionDto): Promise<import("@nestjs/common").HttpException | {
        message: string;
        grade: import("mongoose").Document<unknown, {}, import("../../../utils/schema/userGrade.schema").UserGradeDocument> & import("../../../utils/schema/userGrade.schema").UserGrade & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    } | {
        message: string;
        grade?: undefined;
    }>;
}
