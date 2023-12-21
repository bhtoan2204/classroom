"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidObjectId = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
function IsValidObjectId(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidObjectId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (!mongoose_1.Types.ObjectId.isValid(value)) {
                        return false;
                    }
                    return true;
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid ObjectId`;
                },
            },
        });
    };
}
exports.IsValidObjectId = IsValidObjectId;
//# sourceMappingURL=isValidObjectId.validator.js.map