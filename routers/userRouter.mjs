import express from 'express';
import { displayLoginForm, displayRegisterForm, userList} from '../controllers/userController.mjs';
const router = express.Router();

router.get('/login', displayLoginForm);
router.get('/register', displayRegisterForm);
router.get('/users', userList);


export default router;