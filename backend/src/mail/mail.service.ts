import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService,
    ) { }

    private async setTransport() {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            this.configService.get<string>('GOOGLE_CLIENT_ID'),
            this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
            'https://developers.google.com/oauthplayground',
        );

        oauth2Client.setCredentials({
            refresh_token: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
        });

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject('Failed to create access token');
                }
                resolve(token);
            });
        }).catch((err) => { throw err; });

        const config: Options = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.configService.get('GOOGLE_EMAIL'),
                clientId: this.configService.get('GOOGLE_CLIENT_ID'),
                clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
                accessToken: accessToken as string,
            },
        };

        this.mailerService.addTransporter('gmail', config);
    }

    public async sendOtp(email, otp, title) {
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

    public async sendMail(email: string, title: string, message: string, otp: string) {
        const apiUrl = `${this.configService.get<string>('EMAIL_ENGINE_URL')}`;
        const apiKey = `${this.configService.get<string>('EMAIL_ENGINE_API_KEY')}`;
        const apiId = `${this.configService.get<string>('EMAIL_ENGINE_ID')}`;
        const endpoint = `${apiUrl}/v1/account/${apiId}/submit`;
        const data = {
            from: {
                name: 'Educa',
                address: 'mjkundta@gmail.com',
            },
            to: [
                {
                    name: 'Ethereal',
                    address: email,
                },
            ],
            subject: title,
            text: message,
            html: `<p>Here your OTP ${otp}</p>`
        }

        try {
            const response = await axios.post(endpoint, data, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-type': 'application/json',
                },
            });
            return { status: 200, message: response.data };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }

    public async sendMailInvitation(email: string, class_id: string, code: string) {
        const apiUrl = `${this.configService.get<string>('EMAIL_ENGINE_URL')}`;
        const apiKey = `${this.configService.get<string>('EMAIL_ENGINE_API_KEY')}`;
        const apiId = `${this.configService.get<string>('EMAIL_ENGINE_ID')}`;
        const endpoint = `${apiUrl}/v1/account/${apiId}/submit`;
        const invitationLink = `${this.configService.get<string>('FRONTEND_URL_CLIENT')}/join-class?code=${code}&class_id=${class_id}`;
        const data = {
            from: {
                name: 'Educa',
                address: 'mjkundta@gmail.com',
            },
            to: [
                {
                    name: 'Ethereal',
                    address: email,
                },
            ],
            subject: "Invitation to Join Class",
            text: "Invitation to Join Class ",
            html: `<a href="${invitationLink}">Join class by this link</a>`
        }
        try {
            const response = await axios.post(endpoint, data, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-type': 'application/json',
                },
            });
            console.log(response.data);
            return { status: 200, message: response.data };
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
}