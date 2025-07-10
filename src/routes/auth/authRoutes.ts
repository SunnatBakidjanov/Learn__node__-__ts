import { Router } from 'express';
import { createNewUser } from '../../controllers/auth/createNewUser';

const router = Router();

router.post('/register', createNewUser);

export default router;
