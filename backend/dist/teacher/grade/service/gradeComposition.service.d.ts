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
import { CreateGradeCompositionDto } from "../../dto/createGradeComposition.dto";
import { Class, ClassDocument } from "src/utils/schema/class.schema";
import { ClassUserDocument } from "src/utils/schema/classUser.schema";
import { User } from "src/utils/schema/user.schema";
import { RemoveGradeCompositionDto } from "src/teacher/dto/deleteGradeComposition.dto";
import { UpdateGradeCompositionDto } from "src/teacher/dto/updateGradeComposition.dto";
import { SwapGradeCompositionDto } from "src/teacher/dto/swapGradeComposition.dto";
import { UserGradeDocument } from "src/utils/schema/userGrade.schema";
export declare class GradeCompositionService {
    private readonly classRepository;
    private readonly classUserRepository;
    private readonly userGradeRepository;
    constructor(classRepository: Model<ClassDocument>, classUserRepository: Model<ClassUserDocument>, userGradeRepository: Model<UserGradeDocument>);
    checkIsHost(user: User, classId: string): Promise<any>;
    private checkInClass;
    createGradeComposition(user: User, dto: CreateGradeCompositionDto): Promise<HttpException | {
        message: string;
    }>;
    getCurentGradeStructure(user: User, classId: string): Promise<HttpException | {
        gradeCompo_name: string;
        gradeCompo_scale: number;
        is_finalized: boolean;
    }[]>;
    removeGradeCompositions(user: User, dto: RemoveGradeCompositionDto): Promise<HttpException | (import("mongoose").Document<unknown, {}, ClassDocument> & Class & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })>;
    updateGradeCompositions(user: User, dto: UpdateGradeCompositionDto): Promise<HttpException | (import("mongoose").Document<unknown, {}, ClassDocument> & Class & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })>;
    swapGradeCompositions(user: User, dto: SwapGradeCompositionDto): Promise<HttpException | (import("mongoose").Document<unknown, {}, ClassDocument> & Class & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })>;
}
