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
import { Document, Types } from "mongoose";
import { AbstractDocument } from "../database/abstract.schema";
export type UserGradeDocument = UserGrade & Document;
declare class Grades {
    gradeCompo_name: string;
    gradeCompo_scale: number;
    current_grade: number;
}
export declare class UserGrade extends AbstractDocument {
    user_id: Types.ObjectId;
    class_id: Types.ObjectId;
    grades: Grades[];
    overall_grade: number;
}
export declare const UserGradeSchema: import("mongoose").Schema<UserGrade, import("mongoose").Model<UserGrade, any, any, any, Document<unknown, any, UserGrade> & UserGrade & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserGrade, Document<unknown, {}, import("mongoose").FlatRecord<UserGrade>> & import("mongoose").FlatRecord<UserGrade> & Required<{
    _id: Types.ObjectId;
}>>;
export {};
