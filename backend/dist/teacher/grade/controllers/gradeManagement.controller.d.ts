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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { GradeManagementService } from "../service/gradeManagement.service";
import { StorageService } from "src/storage/storage.service";
import { InputGradeDto } from "src/teacher/dto/inputGrade.dto";
import { MapStudentIdDto } from "src/teacher/dto/mapStudentId.dto";
export declare class GradeManagementController {
    private readonly gradeManagementService;
    private readonly storageService;
    constructor(gradeManagementService: GradeManagementService, storageService: StorageService);
    downloadListStudentTemplate(user: any, params: any, res: any): Promise<void>;
    uploadListStudentCsv(user: any, params: any, file: Express.Multer.File): Promise<{
        message: string;
        fileName: string;
    }>;
    showStudentsListxGradesBoard(user: any, params: any): Promise<any[]>;
    mapStudentId(user: any, dto: MapStudentIdDto): Promise<{
        message: string;
    }>;
    inputGradeForStudentAtSpecificAssignment(user: any, dto: InputGradeDto): Promise<{
        grade: import("mongoose").Document<unknown, {}, import("../../../utils/schema/userGrade.schema").UserGradeDocument> & import("../../../utils/schema/userGrade.schema").UserGrade & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    downloadTemplateByAssignment(user: any, params: any, res: any): Promise<void>;
    uploadGradeByAssignment(user: any, params: any): Promise<void>;
    showTotalGradeColumn(user: any, params: any): Promise<void>;
    exportGradeBoard(user: any, params: any): Promise<void>;
    markGradeAsFinal(user: any, params: any): Promise<{
        gradeCompo_name: string;
        gradeCompo_scale: number;
        is_finalized: boolean;
    }[]>;
}
