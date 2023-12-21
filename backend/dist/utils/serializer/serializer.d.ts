import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../../user/user.service';
import { User } from '../schema/user.schema';
export declare class SessionSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UserService);
    serializeUser(user: User, done: Function): void;
    deserializeUser(payload: any, done: Function): Promise<any>;
}
