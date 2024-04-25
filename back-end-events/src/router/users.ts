import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';
import upload from '../middlewares/multer';


export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner,  deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, upload.single("profile"), updateUser);
};