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
import { GradeViewerService } from "../service/gradeViewer.service";
import { RequestReviewDto } from "src/student/dto/requestReview.dto";
import { PostCommentDto } from "src/student/dto/postComment.dto";
export declare class GradeViewerController {
    private readonly gradeViewerService;
    constructor(gradeViewerService: GradeViewerService);
    viewGradeCompostitions(user: any, params: any): Promise<import("@nestjs/common").HttpException | {
        rows: any[];
        total_scale: number;
        user_total: number;
    }>;
    requestReview(user: any, dto: RequestReviewDto): Promise<import("@nestjs/common").HttpException | (import("mongoose").Document<unknown, {}, import("../../../utils/schema/gradeReview.schema").GradeReviewDocument> & import("../../../utils/schema/gradeReview.schema").GradeReview & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    viewGradeReview(user: any, params: any): Promise<import("@nestjs/common").HttpException | (import("mongoose").Document<unknown, {}, import("../../../utils/schema/gradeReview.schema").GradeReviewDocument> & import("../../../utils/schema/gradeReview.schema").GradeReview & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    postAComment(user: any, dto: PostCommentDto): Promise<import("@nestjs/common").HttpException | (import("mongoose").Document<unknown, {}, import("../../../utils/schema/gradeReview.schema").GradeReviewDocument> & import("../../../utils/schema/gradeReview.schema").GradeReview & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
}
