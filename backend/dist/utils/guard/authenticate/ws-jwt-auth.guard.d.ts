import { ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
declare const WsJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class WsJwtAuthGuard extends WsJwtAuthGuard_base {
    private jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean | any | Promise<boolean | any> | Observable<boolean | any>;
}
export {};
