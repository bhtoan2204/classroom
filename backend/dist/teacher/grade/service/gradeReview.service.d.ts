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
import { MarkFinalDescistionDto } from "src/teacher/dto/markFinalDescistion.dto";
import { ClassDocument } from "src/utils/schema/class.schema";
import { GradeReview, GradeReviewDocument } from "src/utils/schema/gradeReview.schema";
import { User, UserDocument } from "src/utils/schema/user.schema";
import { UserGrade, UserGradeDocument } from "src/utils/schema/userGrade.schema";
export declare class GradeReviewService {
    private gradeReviewRepository;
    private classRepository;
    private userRepository;
    private userGradeRepository;
    constructor(gradeReviewRepository: Model<GradeReviewDocument>, classRepository: Model<ClassDocument>, userRepository: Model<UserDocument>, userGradeRepository: Model<UserGradeDocument>);
    checkInClass(user: User, classId: Types.ObjectId): Promise<any>;
    viewGradeReview(currentUser: User, classid: string): Promise<HttpException | (import("mongoose").Document<unknown, {}, GradeReviewDocument> & GradeReview & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[]>;
    viewGradeReviewDetail(currentUser: User, gradeReviewId: string): Promise<HttpException | {
        student: import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        };
        gradeReview: import("mongoose").Document<unknown, {}, GradeReviewDocument> & GradeReview & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        };
    }>;
    commentGradeReview(currentUser: User, dto: any): Promise<HttpException | {
        message: string;
    }>;
    markFinalGrade(currentUser: User, dto: MarkFinalDescistionDto): Promise<HttpException | {
        message: string;
        grade: import("mongoose").Document<unknown, {}, UserGradeDocument> & UserGrade & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        };
    } | {
        message: string;
        grade?: undefined;
    }>;
}
