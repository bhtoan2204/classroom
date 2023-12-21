import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/utils/schema/user.schema';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    login(dto: LoginDto, currentUser: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(currentUser: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    googleAuth(req: any): Promise<{
        message: string;
    }>;
    googleAuthRedirect(currentUser: User, res: any): Promise<any>;
    facebookAuth(req: any): Promise<{
        message: string;
    }>;
    facebookLoginRedirect(currentUser: User, res: any): Promise<any>;
}
