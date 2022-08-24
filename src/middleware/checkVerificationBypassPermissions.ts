import {NextFunction, Request, Response} from "express";
import {isNullOrUndefined} from "@typegoose/typegoose/lib/internal/utils";
import requireUserIsAdmin from "./requireUserIsAdmin";


export default function checkVerificationBypassPermissions(req: Request, res: Response, next: NextFunction) {
    if (isNullOrUndefined(req.body.verified)) {
        return next();
    }

    if (isNullOrUndefined(res.locals.user)) {
        return res.sendStatus(401);
    }

    return requireUserIsAdmin(req, res, next);
}