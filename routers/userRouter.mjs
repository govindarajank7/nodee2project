import express from 'express';
import { displayLoginForm, getAllUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userController.mjs';
const router = express.Router();

router.get('/login', displayLoginForm);
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/', displayLoginForm);

export default router;