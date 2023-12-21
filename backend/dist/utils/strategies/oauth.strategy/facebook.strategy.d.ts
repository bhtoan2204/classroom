import { ConfigService } from "@nestjs/config";
import { Profile } from "passport-facebook";
import { UserService } from "src/user/user.service";
declare const FacebookStrategy_base: new (...args: any[]) => any;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any>;
}
export {};
