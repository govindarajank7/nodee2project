import express from 'express';
import { displayLoginForm, displayRegisterForm} from '../controllers/userController.mjs';
const router = express.Router();

router.get('/login', displayLoginForm);
router.get('/register', displayRegisterForm);


export default router;