import express, {Request, Response} from 'express';
import user from './user.routes';
import auth from './auth.routes';
import counselor from './counselor.routes';
import misc from './misc.routes'

const router = express.Router();

router.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
router.use(user);
router.use(auth);
router.use(counselor);
router.use(misc);

export default router;