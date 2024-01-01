import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { TokenPayload } from "src/auth/interface/tokenPayload.interface";

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('ws-jwt') {
    constructor(private jwtService: JwtService) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const client = context.switchToWs().getClient();
        try {
            const token = client.handshake.headers.authorization.split(' ')[1];
            this.jwtService.verify(token) as TokenPayload;
            return super.canActivate(new ExecutionContextHost([client]));
        }
        catch (error) {
            client.disconnect(true);
            throw new UnauthorizedException('Token expired or invalid');
        }
    }
}