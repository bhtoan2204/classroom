import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/utils/guard/authenticate/jwt-auth.guard";
import { CurrentUser } from "src/utils/decorator/current-user.decorator";
import { Request } from "express";
import { InvitationService } from "../service/invitation.service";
import { RolesGuard } from "src/utils/guard/authorize/role.guard";
import { Role } from "src/utils/enum/role.enum";
import { Roles } from "src/utils/decorator/role.decorator";
import { InviteEmailDto } from "../dto/inviteEmail.dto";

@ApiTags('Invitation for Teacher')
@Controller('invitation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.TEACHER)
export class InvitationController {
    constructor(
        private readonly invitationService: InvitationService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Get('/:classId')
    @ApiOperation({ summary: 'Get invitations of class' })
    @ApiParam({ name: 'classId', type: String })
    async getInvitations(@CurrentUser() user, @Param() params: any) {
        return this.invitationService.getInvitations(user, params.classId);
    }

    @HttpCode(HttpStatus.CREATED)
    @Get('/code/:classId')
    @ApiOperation({ summary: 'Get invitations of class' })
    @ApiParam({ name: 'classId', type: String })
    async getCodeInvitation(@CurrentUser() user, @Param() params: any, @Req() req: Request) {
        return this.invitationService.getCodeInvitation(user, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/joinClassByLink/:classToken/:classId')
    @ApiOperation({ summary: 'Join class' })
    @ApiParam({ name: 'classToken', type: String })
    @ApiParam({ name: 'classId', type: String })
    async joinClass(@CurrentUser() user, @Param() params: any) {
        return this.invitationService.joinClass(user, params.classToken, params.classId);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/inviteByEmail')
    @ApiOperation({ summary: 'Join class' })
    async sendInviteEmail(@CurrentUser() user, @Body() dto: InviteEmailDto) {
        return this.invitationService.sendEmailInvite(user, dto);
    }

}