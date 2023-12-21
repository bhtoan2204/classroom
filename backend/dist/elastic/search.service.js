"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const elasticsearch_1 = require("@nestjs/elasticsearch");
const common_1 = require("@nestjs/common");
let SearchService = class SearchService {
    elasticsearchService;
    index = 'users';
    constructor(elasticsearchService) {
        this.elasticsearchService = elasticsearchService;
    }
    async indexUser(currentUser) {
        return this.elasticsearchService.index({
            index: this.index,
            body: {
                id: currentUser._id,
                email: currentUser.email,
                fullname: currentUser.fullname,
                role: currentUser.role,
                login_type: currentUser.login_type,
            }
        });
    }
    validateInput(query) {
        if (!query || typeof query !== 'string') {
            throw new Error('Invalid search query');
        }
    }
    buildNameQuery(query) {
        return {
            multi_match: {
                query,
                fields: ['fullname'],
                type: 'cross_fields',
                operator: 'and',
            },
        };
    }
    buildEmailQuery(query) {
        return {
            bool: {
                should: [
                    { term: { email: query } },
                    { match_phrase: { email: query } },
                ],
                minimum_should_match: 1,
            },
        };
    }
    async search(text) {
        this.validateInput(text);
        const nameQuery = this.buildNameQuery(text);
        const emailQuery = this.buildEmailQuery(text);
        const { body } = await this.elasticsearchService.search({
            index: this.index,
            body: {
                query: {
                    bool: {
                        should: [
                            { bool: { must: nameQuery } },
                            { bool: { must: emailQuery } },
                        ],
                    }
                }
            }
        });
        const hits = body.hits.hits;
        return hits.map(hit => hit._source);
    }
    async update(currentUser) {
        const newBody = {
            id: currentUser._id,
            email: currentUser.email,
            fullname: currentUser.fullname,
            role: currentUser.role,
            login_type: currentUser.login_type,
        };
        const script = Object.entries(newBody).reduce((result, [key, value]) => {
            return `${result} ctx._source.${key}='${value}';`;
        }, '');
        return this.elasticsearchService.updateByQuery({
            index: this.index,
            body: {
                query: {
                    match: {
                        id: currentUser._id
                    }
                },
                script: {
                    inline: script
                }
            }
        });
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(elasticsearch_1.ElasticsearchService)),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
], SearchService);
//# sourceMappingURL=search.service.js.map