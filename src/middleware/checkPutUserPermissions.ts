import {NextFunction, Request, Response} from "express";
import {PutUserInput} from "../schema/user.schema";
import requireUserIsAdmin from "./requireUserIsAdmin";
import {User} from "../model/user.model";
import {DocumentType} from "@typegoose/typegoose";
import Role from "../constants/userRoles.constants";


const checkPutUserPermissions = (req: Request<PutUserInput['params'], {}, PutUserInput['body']>, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {roles} = req.body;
    const user: DocumentType<User> | null = res.locals.user;

    if (!user) throw new Error('requireAdmin called but no user is authenticated');
    if (roles) return requireUserIsAdmin(req, res, next);
    if (user._id === id || user.roles.includes(Role.ADMIN)) return next();

    return res.sendStatus(401);
}

export default checkPutUserPermissions;