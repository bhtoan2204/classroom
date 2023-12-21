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
export type ClassDocument = Class & Document;
export declare class Class extends AbstractDocument {
    className: string;
    description: string;
    host: Types.ObjectId;
    list_student_url: string;
    grade_compositions: {
        gradeCompo_name: string;
        gradeCompo_scale: number;
        is_finalized: boolean;
    }[];
}
export declare const ClassSchema: import("mongoose").Schema<Class, import("mongoose").Model<Class, any, any, any, Document<unknown, any, Class> & Class & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Class, Document<unknown, {}, import("mongoose").FlatRecord<Class>> & import("mongoose").FlatRecord<Class> & Required<{
    _id: Types.ObjectId;
}>>;
