import { UserService } from '../../user/user.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly usersService;
    constructor(usersService: UserService);
    validate(request: any): Promise<any>;
}
export {};
