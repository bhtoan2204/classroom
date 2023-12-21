import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/utils/guard/authenticate/jwt-auth.guard";
import { RolesGuard } from "src/utils/guard/authorize/role.guard";
import { Roles } from "src/utils/decorator/role.decorator";
import { Role } from "src/utils/enum/role.enum";
import { GradeViewerService } from "../service/gradeViewer.service";
import { CurrentUser } from "src/utils/decorator/current-user.decorator";
import { RequestReviewDto } from "src/student/dto/requestReview.dto";
import { PostCommentDto } from "src/student/dto/postComment.dto";

@ApiTags('Grade for student')
@Controller('gradeViewer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.STUDENT)
export class GradeViewerController {
    constructor(
        private readonly gradeViewerService: GradeViewerService
    ) { }

    @Get('viewGradeCompostitions/:classId')
    @ApiOperation({ summary: 'View grade compostitions' })
    @ApiParam({ name: 'classId', type: String })
    async viewGradeCompostitions(@CurrentUser() user, @Param() params: any) {
        return this.gradeViewerService.viewGradeCompostitions(user, params.classId);
    }

    @Post('requestReview')
    @ApiOperation({ summary: 'Request a review' })
    async requestReview(@CurrentUser() user, @Body() dto: RequestReviewDto) {
        return this.gradeViewerService.requestReview(user, dto);
    }

    @Get('viewGradeReview/:reviewId')
    @ApiOperation({ summary: 'View grade review' })
    @ApiParam({ name: 'reviewId', type: String })
    async viewGradeReview(@CurrentUser() user, @Param() params: any) {
        return this.gradeViewerService.viewGradeReview(user, params.reviewId);
    }

    @Post('postAComment')
    @ApiOperation({ summary: 'Let a comment' })
    async postAComment(@CurrentUser() user, @Body() dto: PostCommentDto) {
        return this.gradeViewerService.postAComment(user, dto);
    }
}