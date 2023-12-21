import { ElasticsearchService } from '@nestjs/elasticsearch';
import { User } from "src/utils/schema/user.schema";
import { UserResult } from './interface/user-search-results.interace';
import { UserBody } from './interface/user-search-body.interface';
export declare class SearchService {
    private readonly elasticsearchService;
    index: string;
    constructor(elasticsearchService: ElasticsearchService);
    indexUser(currentUser: User): Promise<import("@elastic/elasticsearch").ApiResponse<UserResult, unknown>>;
    private validateInput;
    private buildNameQuery;
    private buildEmailQuery;
    search(text: string): Promise<UserBody[]>;
    update(currentUser: User): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, unknown>>;
}
