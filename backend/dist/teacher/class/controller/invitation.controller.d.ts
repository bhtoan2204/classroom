import { Request } from "express";
import { InvitationService } from "../service/invitation.service";
export declare class InvitationController {
    private readonly invitationService;
    constructor(invitationService: InvitationService);
    getInvitations(user: any, params: any, req: Request): Promise<any>;
    joinClass(user: any, params: any): Promise<any>;
}
