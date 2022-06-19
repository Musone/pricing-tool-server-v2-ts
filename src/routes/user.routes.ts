import express, {Request, Response} from "express";
import validateResource from "../middleware/validateResource";
import {
    createUserSchema,
    forgotPasswordSchema,
    putUserSchema,
    resetPasswordSchema,
    verifyUserSchema
} from "../schema/user.schema";
import {
    createUserHandler,
    forgotPasswordHandler,
    getCurrentUserHandler,
    putUserHandler,
    resetPasswordHandler,
    verifyUserHandler
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import checkPutUserPermissions from "../middleware/checkPutUserPermissions";


const router = express.Router();

router.post('/api/users', validateResource(createUserSchema), createUserHandler);

router.post('/api/users/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler);

router.post('/api/users/forgotPassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

router.post('/api/users/resetPassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler);

router.get('/api/users/me', requireUser, getCurrentUserHandler);

router.put('/api/users/:id', requireUser, validateResource(putUserSchema), checkPutUserPermissions, putUserHandler);

export default router;