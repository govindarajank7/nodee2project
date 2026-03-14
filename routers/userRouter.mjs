import express from 'express';
import { displayLoginForm, displayRegisterForm, userList, displayEditUserForm, updateUserForm, deleteUserForm, logoutUser } from '../controllers/userController.mjs';
import { upload } from '../middlewares/uploadMiddleware.mjs';
import { requireViewAuth } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/login', displayLoginForm);
router.get('/register', displayRegisterForm);
router.get('/users', requireViewAuth, userList);
router.get('/users/:id/edit', requireViewAuth, displayEditUserForm);
router.post('/users/:id', requireViewAuth, upload.single('userphoto'), updateUserForm);
router.post('/users/:id/delete', requireViewAuth, deleteUserForm);
router.get('/logout', requireViewAuth, logoutUser);

export default router;