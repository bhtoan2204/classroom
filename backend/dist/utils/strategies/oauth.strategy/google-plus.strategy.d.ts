import { Profile } from 'passport-google-oauth20';
import { UserService } from '../../../user/user.service';
import { ConfigService } from '@nestjs/config';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any>;
}
export {};
