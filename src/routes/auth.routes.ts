import express from "express";
import validateResource from "../middleware/validateResource";
import {createSessionSchema} from "../schema/auth.schema";
import {createSessionHandler, logoutHandler, refreshAccessTokenHandler} from "../controller/auth.controller";
import requireUser from "../middleware/requireUser";


const router = express.Router();

router.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler);

router.post('/api/sessions/refresh', refreshAccessTokenHandler);

router.post('/api/sessions/logout', logoutHandler);

export default router;