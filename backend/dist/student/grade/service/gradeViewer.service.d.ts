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
/// <reference types="mongoose/types/inferschematype" />
import { HttpException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { PostCommentDto } from "src/student/dto/postComment.dto";
import { RequestReviewDto } from "src/student/dto/requestReview.dto";
import { ClassDocument } from "src/utils/schema/class.schema";
import { ClassUserDocument } from "src/utils/schema/classUser.schema";
import { GradeReview, GradeReviewDocument } from "src/utils/schema/gradeReview.schema";
import { User } from "src/utils/schema/user.schema";
import { UserGradeDocument } from "src/utils/schema/userGrade.schema";
export declare class GradeViewerService {
    private readonly classUserRepository;
    private readonly userGradeRepository;
    private readonly classRepository;
    private readonly gradeReviewRepository;
    constructor(classUserRepository: Model<ClassUserDocument>, userGradeRepository: Model<UserGradeDocument>, classRepository: Model<ClassDocument>, gradeReviewRepository: Model<GradeReviewDocument>);
    checkInClass(user: User, classId: Types.ObjectId): Promise<any>;
    viewGradeCompostitions(user: User, classid: string): Promise<HttpException | {
        rows: any[];
        total_scale: number;
        user_total: number;
    }>;
    requestReview(user: User, dto: RequestReviewDto): Promise<HttpException | (import("mongoose").Document<unknown, {}, GradeReviewDocument> & GradeReview & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })>;
    viewGradeReview(user: User, reviewId: string): Promise<HttpException | (import("mongoose").Document<unknown, {}, GradeReviewDocument> & GradeReview & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })>;
    postAComment(user: User, dto: PostCommentDto): Promise<HttpException | (import("mongoose").Document<unknown, {}, GradeReviewDocument> & GradeReview & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })>;
}
