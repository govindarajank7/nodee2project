import express from 'express';
import { displayLoginForm, displayRegisterForm, userList, logoutUser } from '../controllers/userController.mjs';
import { requireViewAuth } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/login', displayLoginForm);
router.get('/register', displayRegisterForm);
router.get('/users', requireViewAuth, userList);
router.get('/logout', requireViewAuth, logoutUser);

export default router;