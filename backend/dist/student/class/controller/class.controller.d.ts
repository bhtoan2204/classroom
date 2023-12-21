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
import { ClassService } from "../service/class.service";
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    joinClassByCode(user: any, params: any): Promise<any>;
    joinClassByLink(user: any, params: any): Promise<any>;
    getJoinedClasses(user: any): Promise<{
        class_id: import("mongoose").Types.ObjectId;
        class_name: string;
        class_description: string;
    }[]>;
    viewGradeStructure(user: any, params: any): Promise<import("@nestjs/common").NotFoundException | {
        gradeCompo_name: string;
        gradeCompo_scale: number;
        is_finalized: boolean;
    }[] | import("@nestjs/common").ForbiddenException>;
    viewClassMembers(user: any, params: any): Promise<import("@nestjs/common").NotFoundException | (import("mongoose").Document<unknown, {}, import("../../../utils/schema/user.schema").UserDocument> & import("../../../utils/schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | import("@nestjs/common").ForbiddenException>;
    viewClassTeachers(user: any, params: any): Promise<import("@nestjs/common").NotFoundException | (import("mongoose").Document<unknown, {}, import("../../../utils/schema/user.schema").UserDocument> & import("../../../utils/schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | import("@nestjs/common").ForbiddenException>;
}
