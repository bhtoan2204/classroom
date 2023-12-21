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
exports.CreateGradeCompositionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const isValidObjectId_validator_1 = require("../../utils/customValidator/isValidObjectId.validator");
class CreateGradeCompositionDto {
    class_id;
    name;
    scale;
}
exports.CreateGradeCompositionDto = CreateGradeCompositionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class id'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, isValidObjectId_validator_1.IsValidObjectId)(),
    __metadata("design:type", String)
], CreateGradeCompositionDto.prototype, "class_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the grade composition',
        example: 'Quiz 1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGradeCompositionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Scale of the grade composition',
        example: 100,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateGradeCompositionDto.prototype, "scale", void 0);
//# sourceMappingURL=createGradeComposition.dto.js.map