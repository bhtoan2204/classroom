"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const accounts_module_1 = require("../admin/accounts/accounts.module");
const admin_module_1 = require("../admin/admin.module");
const class_module_1 = require("../student/class/class.module");
const grade_module_1 = require("../student/grade/grade.module");
const student_module_1 = require("../student/student.module");
const class_module_2 = require("../teacher/class/class.module");
const grade_module_2 = require("../teacher/grade/grade.module");
const teacher_module_1 = require("../teacher/teacher.module");
let RouteModule = class RouteModule {
};
exports.RouteModule = RouteModule;
exports.RouteModule = RouteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '',
                    module: admin_module_1.AdminModule,
                    children: [
                        {
                            path: 'admin',
                            module: accounts_module_1.AccountsModule,
                        }
                    ]
                },
                {
                    path: '',
                    module: teacher_module_1.TeacherModule,
                    children: [
                        {
                            path: 'teacher',
                            module: class_module_2.ClassModule,
                        },
                        {
                            path: 'teacher',
                            module: grade_module_2.GradeModule,
                        }
                    ]
                },
                {
                    path: '',
                    module: student_module_1.StudentModule,
                    children: [
                        {
                            path: 'student',
                            module: class_module_1.ClassStudentsModule,
                        },
                        {
                            path: 'student',
                            module: grade_module_1.GradeViewerModule,
                        }
                    ]
                }
            ])
        ],
        exports: [RouteModule]
    })
], RouteModule);
//# sourceMappingURL=route.module.js.map