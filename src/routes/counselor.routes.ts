import express from "express";
import validateResource from "../middleware/validateResource";
import {getCounselorsHandler, putCounselorHandler} from "../controller/counselor.controller";
import requireUser from "../middleware/requireUser";
import requireUserIsCounselorOrAdmin from "../middleware/requireUserIsCounselorOrAdmin";
import {putCounselorSchema} from "../schema/counselor.schema";


const router = express.Router();

router.get('/api/counselors', getCounselorsHandler);
// router.get('/api/counselors/:id', validateResource(queryCounselorsSchema), queryCounserlorsHandler);
router.put('/api/counselors/:id', requireUser, requireUserIsCounselorOrAdmin, validateResource(putCounselorSchema), putCounselorHandler);
// router.put('/api/counselors/?hello', requireUser, /*, validateResource(____)*/ requireUserIsCounselorOrAdmin, putCounselorHandler);

export default router;