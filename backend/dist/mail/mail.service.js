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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
let MailService = class MailService {
    mailerService;
    configService;
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async setTransport() {
        const OAuth2 = googleapis_1.google.auth.OAuth2;
        const oauth2Client = new OAuth2(this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'), 'https://developers.google.com/oauthplayground');
        oauth2Client.setCredentials({
            refresh_token: this.configService.get('GOOGLE_REFRESH_TOKEN'),
        });
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject('Failed to create access token');
                }
                resolve(token);
            });
        }).catch((err) => { throw err; });
        const config = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.configService.get('GOOGLE_EMAIL'),
                clientId: this.configService.get('GOOGLE_CLIENT_ID'),
                clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
                accessToken: accessToken,
            },
        };
        this.mailerService.addTransporter('gmail', config);
    }
    async sendOtp(email, otp, title) {
        await this.setTransport();
        this.mailerService
            .sendMail({
            transporterName: 'gmail',
            to: email,
            from: 'mjkundta@gmail.com',
            subject: title,
            template: 'action',
            context: {
                code: otp,
            },
        })
            .then((success) => {
            return { message: 'success' };
        })
            .catch((err) => {
            throw err;
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map