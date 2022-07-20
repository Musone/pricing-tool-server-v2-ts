"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const counselor_controller_1 = require("../controller/counselor.controller");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const requireUserIsTheCounselorOrAdmin_1 = __importDefault(require("../middleware/requireUserIsTheCounselorOrAdmin"));
const counselor_schema_1 = require("../schema/counselor.schema");
const requireUserIsCounselor_1 = __importDefault(require("../middleware/requireUserIsCounselor"));
const uploadPfp_1 = __importDefault(require("../utils/uploadPfp"));
const router = express_1.default.Router();
router.get('/api/counselors', counselor_controller_1.getCounselorsHandler);
router.get('/api/counselors/me', requireUser_1.default, requireUserIsCounselor_1.default, counselor_controller_1.getMyCounselorProfileHandler);
router.put('/api/counselors/:id', requireUser_1.default, requireUserIsTheCounselorOrAdmin_1.default, (0, validateResource_1.default)(counselor_schema_1.putCounselorSchema), uploadPfp_1.default, counselor_controller_1.putCounselorHandler);
exports.default = router;
