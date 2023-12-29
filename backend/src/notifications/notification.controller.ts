import { Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/utils/guard/authenticate/jwt-auth.guard";
import { NotificationService } from "./notification.service";
import { CurrentUser } from "src/utils/decorator/current-user.decorator";
import { User } from "src/utils/schema/user.schema";

@ApiTags('Notification')
@Controller('notification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Get()
    @ApiOperation({ summary: 'Create Class' })
    async getNotifications(@CurrentUser() user: User) {
        return this.notificationService.getNotifications(user);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('/:notificationId')
    @ApiOperation({ summary: 'Mark read' })
    @ApiParam({ name: 'notificationId', type: String })
    async markRead(@CurrentUser() user: User, notificationId: string) {
        return this.notificationService.markRead(user, notificationId);
    }
}