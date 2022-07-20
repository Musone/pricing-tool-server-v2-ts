import express from "express";


const router = express.Router()

router.get('/api/heart-beat', (req, res) => res.send('I\'m alive.'));


export default router;