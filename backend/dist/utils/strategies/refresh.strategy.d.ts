import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../../auth/interface/tokenPayload.interface';
declare const RefreshStrategy_base: new (...args: any[]) => any;
export declare class RefreshStrategy extends RefreshStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: TokenPayload): Promise<TokenPayload>;
}
export {};
