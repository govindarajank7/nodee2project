import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.mjs';
import { requireApiAuth } from '../middlewares/authMiddleware.mjs';
import { getAllUsers, getUser, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController.mjs';

const router = express.Router();
router.post('/login', loginUser);

router.get('/users', requireApiAuth, getAllUsers);
router.get('/users/:id', requireApiAuth, getUser);
router.post('/users', upload.single('userphoto'), createUser);
router.put('/users/:id', requireApiAuth, updateUser);
router.delete('/users/:id', requireApiAuth, deleteUser);

export default router;