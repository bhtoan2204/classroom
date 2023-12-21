import { ExecutionContext } from '@nestjs/common';
import { User } from '../schema/user.schema';
export declare const getCurrentUserByContext: (context: ExecutionContext) => User;
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const getWsCurrentUserByContext: (context: ExecutionContext) => User;
export declare const WsCurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
