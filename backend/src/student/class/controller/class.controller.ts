import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ClassService } from "../service/class.service";
import { JwtAuthGuard } from "src/utils/guard/authenticate/jwt-auth.guard";
import { RolesGuard } from "src/utils/guard/authorize/role.guard";
import { Roles } from "src/utils/decorator/role.decorator";
import { Role } from "src/utils/enum/role.enum";
import { CurrentUser } from "src/utils/decorator/current-user.decorator";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { MapStudentIdDto } from "src/student/dto/mapStudentId.dto";

@ApiTags('Class for student')
@Controller('class')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.STUDENT)
export class ClassController {
    constructor(
        private readonly classService: ClassService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('joinClassByCode/:classId')
    @ApiOperation({ summary: 'Join class' })
    @ApiParam({ name: 'classId', type: String })
    async joinClassByCode(@CurrentUser() user, @Param() params: any) {
        return this.classService.joinClassByClassId(user, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/joinClassByLink/:classToken/:classId')
    @ApiOperation({ summary: 'Join class' })
    @ApiParam({ name: 'classToken', type: String })
    @ApiParam({ name: 'classId', type: String })
    async joinClassByLink(@CurrentUser() user, @Param() params: any) {
        return this.classService.joinClass(user, params.classToken, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/getJoinedClasses')
    @ApiOperation({ summary: 'Get joined classes' })
    async getJoinedClasses(@CurrentUser() user) {
        return this.classService.getJoinedClasses(user);
    }

    @HttpCode(HttpStatus.OK)
    @Get('getGradeStructure/:classId')
    @ApiParam({ name: 'classId', type: String })
    @ApiOperation({ summary: 'Get grade structure' })
    async viewGradeStructure(@CurrentUser() user, @Param() params: any) {
        return this.classService.viewGradeStructure(user, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Get('viewClassMembers/:classId')
    @ApiParam({ name: 'classId', type: String })
    @ApiOperation({ summary: 'View class members' })
    async viewClassMembers(@CurrentUser() user, @Param() params: any) {
        return this.classService.viewClassMembers(user, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Get('viewClassTeachers/:classId')
    @ApiParam({ name: 'classId', type: String })
    @ApiOperation({ summary: 'View class members' })
    async viewClassTeachers(@CurrentUser() user, @Param() params: any) {
        return this.classService.viewClassTeachers(user, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/mapStudentId')
    @ApiOperation({ summary: 'Map student id' })
    async mapStudentId(@CurrentUser() user, @Body() dto: MapStudentIdDto) {
        return this.classService.mapStudentId(user, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('leaveClass/:classId')
    @ApiParam({ name: 'classId', type: String })
    @ApiOperation({ summary: 'Leave class' })
    async leaveClass(@CurrentUser() user, @Param() params: any) {
        return this.classService.leaveClass(user, params.classId);
    }

}