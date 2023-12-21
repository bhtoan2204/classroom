import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private mailerService;
    private configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    private setTransport;
    sendOtp(email: any, otp: any, title: any): Promise<void>;
}
