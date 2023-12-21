import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/utils/schema/user.schema';
export declare class AuthService {
    private readonly configService;
    private readonly jwtService;
    private readonly userService;
    constructor(configService: ConfigService, jwtService: JwtService, userService: UserService);
    login(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getToken(userId: any, role: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
