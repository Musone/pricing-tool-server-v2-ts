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
    createUserHandler, deleteUserByIdHandler,
    forgotPasswordHandler,
    getCurrentUserHandler, getUsersHandler,
    putUserHandler,
    resetPasswordHandler,
    verifyUserHandler
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import checkPutUserPermissions from "../middleware/checkPutUserPermissions";
import requireUserIsAdmin from "../middleware/requireUserIsAdmin";
import checkVerificationBypassPermissions from "../middleware/checkVerificationBypassPermissions";


const router = express.Router();

router.post('/api/users', validateResource(createUserSchema), checkVerificationBypassPermissions, createUserHandler);

router.post('/api/users/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler);

router.post('/api/users/forgotPassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

router.post('/api/users/resetPassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler);

router.get('/api/users/me', requireUser, getCurrentUserHandler);

router.put('/api/users/:id', requireUser, validateResource(putUserSchema), checkPutUserPermissions, putUserHandler);

router.get('/api/users', requireUser, requireUserIsAdmin, getUsersHandler);

router.delete('/api/users/:id', requireUser, requireUserIsAdmin, deleteUserByIdHandler);

export default router;