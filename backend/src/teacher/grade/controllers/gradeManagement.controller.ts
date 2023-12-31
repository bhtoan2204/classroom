import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards, Res, Header, Body, Post, Patch, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/utils/guard/authenticate/jwt-auth.guard";
import { CurrentUser } from "src/utils/decorator/current-user.decorator";
import { GradeManagementService } from "../service/gradeManagement.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "src/utils/guard/authorize/role.guard";
import { Roles } from "src/utils/decorator/role.decorator";
import { Role } from "src/utils/enum/role.enum";
import { InputGradeDto } from "src/teacher/dto/inputGrade.dto";
import { UploadGradeAssignmentDto } from "src/teacher/dto/uploadGradeAssignment.dto";
import { Types } from "mongoose";

@ApiTags('Grade Management for Teacher')
@Controller('gradeManagement')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.TEACHER)
export class GradeManagementController {
    constructor(
        private readonly gradeManagementService: GradeManagementService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'classId', type: String })
    @Get('/downloadListStudentTemplate/:classId')
    @Header('Content-Type', 'text/xlsx')
    async downloadListStudentTemplate(@CurrentUser() user, @Param() params: any, @Res() res) {
        const classId = new Types.ObjectId(params.classId);
        const result = await this.gradeManagementService.downloadListStudentTemplate(user, classId);
        res.download(`${result}`);
    }

    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('listStudent', {
        fileFilter: (req, file, callback) => {
            if (file.originalname.match(/\.(csv|xlsx)$/)) {
                return callback(null, true);
            }
            return callback(new Error('Only CSV or XLSX files are allowed!'), false);
        },
    }))
    @ApiParam({ name: 'classId', type: String })
    @ApiOperation({ summary: 'Upload list of students in a class' })
    @Post('/uploadListStudent/:classId')
    async uploadListStudentCsv(@CurrentUser() user, @Param() params: any, @UploadedFile() file: Express.Multer.File) {
        return this.gradeManagementService.uploadListStudentCsv(user, params.classId, file);
    }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Show grade composition of a class' })
    @ApiParam({ name: 'classId', type: String })
    @Get('/showGradeOfStudent/:classId')
    async showStudentsListxGradesBoard(@CurrentUser() user, @Param() params: any) {
        return this.gradeManagementService.showStudentsListxGradesBoard(user, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Input grade composition of a student' })
    @Patch('/inputGradeForStudentAtSpecificAssignment')
    async inputGradeForStudentAtSpecificAssignment(@CurrentUser() user, @Body() dto: InputGradeDto) {
        return this.gradeManagementService.inputGradeForStudent(user, dto);
    }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Show grade composition of a class' })
    @Get('/downloadTemplateByAssignment/:classId/:gradeCompo_name')
    @ApiParam({ name: 'classId', type: String })
    @ApiParam({ name: 'gradeCompo_name', type: String })
    async downloadTemplateByAssignment(@CurrentUser() user, @Param() params: any, @Res() res) {
        const result = await this.gradeManagementService.downloadTemplateByAssignment(user, params.classId, params.gradeCompo_name);
        res.download(`${result}`);
    }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Upload grade of students by assignment' })
    @Post('/uploadGradeByAssignment')
    @UseInterceptors(FileInterceptor('grade', {
        fileFilter: (req, file, callback) => {
            if (file.originalname.match(/\.(csv|xlsx)$/)) {
                return callback(null, true);
            }
            return callback(new Error('Only CSV or XLSX files are allowed!'), false);
        },
    }))
    async uploadGradeByAssignment(@CurrentUser() user, @UploadedFile() file: Express.Multer.File, @Body() dto: UploadGradeAssignmentDto) {
        return this.gradeManagementService.uploadGradeByAssignment(user, file, dto);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Patch('/markGradeAsFinal/:classId/:gradeCompositionName')
    @ApiParam({ name: 'gradeCompositionName', type: String })
    @ApiParam({ name: 'classId', type: String })
    async markGradeAsFinal(@CurrentUser() user, @Param() params: any) {
        return this.gradeManagementService.markGradeCompositionAsFinal(user, params.gradeCompositionName, params.classId);
    }
}