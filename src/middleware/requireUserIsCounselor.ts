import Role from "../constants/userRoles.constants";
import {NextFunction, Request, Response} from "express";
import {DocumentType} from "@typegoose/typegoose";
import {User} from "../model/user.model";


const requireUserIsCounselor = (req: Request, res: Response, next: NextFunction) => {
    const user: DocumentType<User> | null = res.locals.user;
    if (!user) throw new Error('requireUserIsAdmin called but no user is authenticated');

    if (!user.roles.includes(Role.COUNSELOR)) {
        return res.status(403).send('User is not a counselor');
    }

    return next();
}

export default requireUserIsCounselor;