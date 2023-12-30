import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ClassService } from "../service/class.service";
import { CreateClassDto } from "../dto/createClass.dto";
import { JwtAuthGuard } from "src/utils/guard/authenticate/jwt-auth.guard";
import { CurrentUser } from "src/utils/decorator/current-user.decorator";
import { RolesGuard } from "src/utils/guard/authorize/role.guard";
import { Roles } from "src/utils/decorator/role.decorator";
import { Role } from "src/utils/enum/role.enum";
import { PaginateDto } from "../dto/paginate.dto";
import { GetUserDto } from "../dto/listPaginate.dto";
import { MapStudentDto } from "../dto/mapStudent.dto";

@ApiTags('Class for Teacher')
@Controller('class')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.TEACHER)
export class ClassController {
    constructor(
        private readonly classService: ClassService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('/create')
    @ApiOperation({ summary: 'Create Class' })
    async create(@CurrentUser() host, @Body() dto: CreateClassDto) {
        return this.classService.create(host, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/getMyClasses')
    @ApiOperation({ summary: 'Get my classes' })
    async getMyClasses(@CurrentUser() host, @Body() dto: PaginateDto) {
        return this.classService.getMyClasses(host, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/getJoinedClasses')
    @ApiOperation({ summary: 'Get joined classes' })
    async getJoinedClasses(@CurrentUser() host, @Body() dto: PaginateDto) {
        return this.classService.getJoinedClasses(host, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/classDetail/:classId')
    @ApiOperation({ summary: 'Get class detail' })
    @ApiParam({ name: 'classId', type: String })
    async getClassDetail(@CurrentUser() host, @Param() params: any) {
        return this.classService.getClassDetail(host, params.classId);
    }

    @Delete('/:classId')
    @ApiOperation({ summary: 'Delete class' })
    @ApiParam({ name: 'classId', type: String })
    async deleteClass(@CurrentUser() host, @Param() params: any) {
        return this.classService.deleteClass(host, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getTeachers/:classId')
    @ApiOperation({ summary: 'Get teacher of class' })
    @ApiParam({ name: 'classId', type: String })
    async getTeacher(@CurrentUser() user, @Param() params: any) {
        return this.classService.getTeachers(user, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/getStudents')
    @ApiOperation({ summary: 'Get students of class' })
    async getStudents(@CurrentUser() user, @Body() dto: GetUserDto) {
        return this.classService.getStudents(user, dto.class_id, dto.page, dto.itemPerPage);
    }

    @Patch('/manualMapStudentId')
    @ApiOperation({ summary: 'Manual map student id' })
    async manualMapStudentId(@CurrentUser() user, @Body() dto: MapStudentDto) {
        return this.classService.manualMapStudentId(user, dto.class_id, dto.user_id, dto.student_id);
    }
}