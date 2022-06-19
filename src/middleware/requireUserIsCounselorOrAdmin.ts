import {DocumentType} from "@typegoose/typegoose";
import {User} from "../model/user.model";
import Role from "../constants/userRoles.constants";
import {NextFunction, Request, Response} from "express";


const requireUserIsCounselorOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const user: DocumentType<User> | null = res.locals.user;
    if (!user) throw new Error('requireUserIsCounselorOrAdmin called but no user is authenticated');

    const is = (user.roles.includes(Role.COUNSELOR) && user._id === id) || user.roles.includes(Role.ADMIN);
    if (!is) return res.status(403).send('hello');

    return next();
}

export default requireUserIsCounselorOrAdmin;