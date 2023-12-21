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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../../../utils/enum/role.enum");
class SearchFilterDto {
    role;
    page;
    perPage;
}
exports.SearchFilterDto = SearchFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: [role_enum_1.Role.TEACHER, role_enum_1.Role.STUDENT, 'all'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_enum_1.Role),
    __metadata("design:type", String)
], SearchFilterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
        description: 'Page index (starting from 1)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Page should be an integer greater than 0' }),
    (0, class_validator_1.Min)(1, { message: 'Page should be greater than 0' }),
    __metadata("design:type", Number)
], SearchFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Number,
        description: 'Items per page',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'PerPage should be an integer' }),
    (0, class_validator_1.Min)(5, { message: 'PerPage should be greater than or equal to 5' }),
    (0, class_validator_1.Min)(20, { message: 'PerPage should be less than or equal to 20' }),
    __metadata("design:type", Number)
], SearchFilterDto.prototype, "perPage", void 0);
//# sourceMappingURL=searchFilter.dto.js.map