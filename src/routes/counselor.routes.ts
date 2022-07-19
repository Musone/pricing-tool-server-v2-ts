import express, {Request, NextFunction, Response} from "express";
import validateResource from "../middleware/validateResource";
import {
    getCounselorsHandler,
    getMyCounselorProfileHandler,
    putCounselorHandler
} from "../controller/counselor.controller";
import requireUser from "../middleware/requireUser";
import requireUserIsTheCounselorOrAdmin from "../middleware/requireUserIsTheCounselorOrAdmin";
import {putCounselorSchema} from "../schema/counselor.schema";
import requireUserIsCounselor from "../middleware/requireUserIsCounselor";
import uploadPfp from "../utils/uploadPfp";

const router = express.Router();

router.get('/api/counselors', getCounselorsHandler);
router.get('/api/counselors/me', requireUser, requireUserIsCounselor, getMyCounselorProfileHandler);
router.put('/api/counselors/:id', requireUser, requireUserIsTheCounselorOrAdmin, validateResource(putCounselorSchema), uploadPfp, putCounselorHandler);

export default router;