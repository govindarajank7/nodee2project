import express from 'express';
import { displayLoginForm, displayRegisterForm, userList, displayEditUserForm, updateUserForm, deleteUserForm, logoutUser, createUserWeb } from '../controllers/userController.mjs';
import { upload } from '../middlewares/uploadMiddleware.mjs';
import { requireViewAuth, requireEditAuth, requireSuperAuth } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/login', displayLoginForm);
router.get('/register', displayRegisterForm);
router.post('/register', upload.single('userphoto'), createUserWeb);
router.get('/users', requireViewAuth, userList);
router.get('/users/:id/edit', requireEditAuth, displayEditUserForm);
router.post('/users/:id', requireEditAuth, upload.single('userphoto'), updateUserForm);
router.post('/users/:id/delete', requireSuperAuth, deleteUserForm);
router.get('/logout', requireViewAuth, logoutUser);

export default router;