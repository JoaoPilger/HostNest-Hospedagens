import express from 'express';
import { getUserId, getUser, updateUser, deleteUser, createUser, loginUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUser);

router.get('/:id', getUserId)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

router.post('/cadastro', createUser)

router.post('/login', loginUser);

export default router;