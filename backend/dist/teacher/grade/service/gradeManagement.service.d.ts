/// <reference types="multer" />
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
import { Model, Types } from "mongoose";
import { StorageService } from "src/storage/storage.service";
import { ClassUserDocument } from "src/utils/schema/classUser.schema";
import { User, UserDocument } from "src/utils/schema/user.schema";
import { ClassDocument } from "src/utils/schema/class.schema";
import { UserGrade, UserGradeDocument } from "src/utils/schema/userGrade.schema";
import { InputGradeDto } from "src/teacher/dto/inputGrade.dto";
import { MapStudentIdDto } from "src/teacher/dto/mapStudentId.dto";
export declare class GradeManagementService {
    private readonly classUserRepository;
    private readonly userRepository;
    private readonly classRepository;
    private readonly userGradeRepository;
    private readonly storageService;
    constructor(classUserRepository: Model<ClassUserDocument>, userRepository: Model<UserDocument>, classRepository: Model<ClassDocument>, userGradeRepository: Model<UserGradeDocument>, storageService: StorageService);
    checkIsHost(user: User, classId: Types.ObjectId): Promise<any>;
    private styleSheet;
    private checkInClass;
    private getStudentOfClass;
    private isClassExist;
    downloadListStudentTemplate(currentUser: User, classid: string): Promise<unknown>;
    uploadListStudentCsv(currentUser: User, classid: string, file: Express.Multer.File): Promise<{
        message: string;
        fileName: string;
    }>;
    showStudentsListxGradesBoard(currentUser: User, classid: string): Promise<any[]>;
    mapStudentId(user: User, dto: MapStudentIdDto): Promise<{
        message: string;
    }>;
    inputGradeForStudent(currentUser: User, dto: InputGradeDto): Promise<{
        grade: import("mongoose").Document<unknown, {}, UserGradeDocument> & UserGrade & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    downloadTemplateByAssignment(currentUser: User, classid: string, targetGradeCompoName: string): Promise<unknown>;
    exportGradeBoard(currentUser: User, classid: string, gradeCompo_name: string): Promise<void>;
    markGradeCompositionAsFinal(currentUser: User, gradeCompositionName: string, classid: string): Promise<{
        gradeCompo_name: string;
        gradeCompo_scale: number;
        is_finalized: boolean;
    }[]>;
}
