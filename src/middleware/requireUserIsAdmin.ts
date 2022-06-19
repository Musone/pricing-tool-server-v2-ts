import {NextFunction, Request, Response} from "express";
import {User} from "../model/user.model";
import {DocumentType} from "@typegoose/typegoose";
import Role from "../constants/userRoles.constants";



/**
 * Checks if the currently authenticated user is an admin.
 * This middleware must be used after requireUser. If it is not, this function will throw a run-time error.
 * If user is an admin, passes request to the next callback.
 * Otherwise, responds with an HTTP error.
 * @param req
 * @param res
 * @param next
 */
const requireUserIsAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user: DocumentType<User> | null = res.locals.user;
    if (!user) throw new Error('requireUserIsAdmin called but no user is authenticated');

    const isAdmin = user.roles.includes(Role.ADMIN);
    if (!isAdmin) return res.sendStatus(403);

    return next();
}

export default requireUserIsAdmin;