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
import { AbstractDocument } from "src/utils/database/abstract.schema";
export type ClassUserDocument = ClassUser & Document;
declare class Student {
    user_id: Types.ObjectId;
    student_id: string;
}
declare class Teacher {
    user_id: Types.ObjectId;
}
export declare class ClassUser extends AbstractDocument {
    class_id: Types.ObjectId;
    students: Student[];
    teachers: Teacher[];
}
export declare const ClassUserSchema: import("mongoose").Schema<ClassUser, import("mongoose").Model<ClassUser, any, any, any, Document<unknown, any, ClassUser> & ClassUser & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ClassUser, Document<unknown, {}, import("mongoose").FlatRecord<ClassUser>> & import("mongoose").FlatRecord<ClassUser> & Required<{
    _id: Types.ObjectId;
}>>;
export {};
