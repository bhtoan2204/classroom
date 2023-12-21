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
exports.EditProfileDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EditProfileDTO {
    fullname;
    birthday;
}
exports.EditProfileDTO = EditProfileDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fullname of the user',
        example: 'Michual Guay',
    }),
    (0, class_validator_1.IsString)({
        message: 'Full name must be a string',
    }),
    __metadata("design:type", String)
], EditProfileDTO.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Birthday of the user',
        example: '2000-01-01',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], EditProfileDTO.prototype, "birthday", void 0);
//# sourceMappingURL=editProfile.dto.js.map