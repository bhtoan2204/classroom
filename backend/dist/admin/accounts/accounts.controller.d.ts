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
import { AccountsService } from "./accounts.service";
import { SearchFilterDto } from "./dto/searchFilter.dto";
import { SearchService } from "src/elastic/search.service";
export declare class AccountsController {
    private readonly accountsService;
    private readonly searchService;
    constructor(accountsService: AccountsService, searchService: SearchService);
    getUsers(filter: SearchFilterDto): Promise<(import("mongoose").Document<unknown, {}, import("../../utils/schema/user.schema").UserDocument> & import("../../utils/schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getTeachersPerPage(): Promise<void>;
    getStudentPerPage(): Promise<void>;
    getAccountDetail(): Promise<void>;
    banOrUnbanAccount(params: any): Promise<"Ban successfully" | "Unban successfully">;
    searchAccounts(params: any): Promise<import("../../elastic/interface/user-search-body.interface").UserBody[]>;
    elasticSearchAccounts(): Promise<void>;
}
