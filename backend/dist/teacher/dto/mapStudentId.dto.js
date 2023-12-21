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
exports.MapStudentIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const isValidObjectId_validator_1 = require("../../utils/customValidator/isValidObjectId.validator");
class MapStudentIdDto {
    class_id;
    user_id;
    new_studentId;
}
exports.MapStudentIdDto = MapStudentIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class id'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, isValidObjectId_validator_1.IsValidObjectId)(),
    __metadata("design:type", String)
], MapStudentIdDto.prototype, "class_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User id'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, isValidObjectId_validator_1.IsValidObjectId)(),
    __metadata("design:type", String)
], MapStudentIdDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student id',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MapStudentIdDto.prototype, "new_studentId", void 0);
//# sourceMappingURL=mapStudentId.dto.js.map