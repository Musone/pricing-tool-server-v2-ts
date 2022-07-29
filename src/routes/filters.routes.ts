import express from "express";
import requireUser from "../middleware/requireUser";
import requireUserIsAdmin from "../middleware/requireUserIsAdmin";
import {
    handleAddApproach,
    handleAddCredential,
    handleAddLanguage,
    handleAddSpecialization,
    handleDeleteApproach,
    handleDeleteCredential,
    handleDeleteLanguage,
    handleDeleteSpecialization,
    handleGetFilters
} from "../controller/filters.controller";

const router = express.Router();

router.get('/api/filters', handleGetFilters)
router.post('/api/filters/specializations', requireUser, requireUserIsAdmin, handleAddSpecialization)
router.post('/api/filters/approaches', requireUser, requireUserIsAdmin, handleAddApproach)
router.post('/api/filters/credentials', requireUser, requireUserIsAdmin, handleAddCredential)
router.post('/api/filters/languages', requireUser, requireUserIsAdmin, handleAddLanguage)

router.delete('/api/filters/specializations/:filter', requireUser, requireUserIsAdmin, handleDeleteSpecialization)
router.delete('/api/filters/approaches/:filter', requireUser, requireUserIsAdmin, handleDeleteApproach)
router.delete('/api/filters/credentials/:filter', requireUser, requireUserIsAdmin, handleDeleteCredential)
router.delete('/api/filters/languages/:filter', requireUser, requireUserIsAdmin, handleDeleteLanguage)


export default router;