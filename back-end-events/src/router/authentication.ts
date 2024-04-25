import express from 'express';

import { register, login } from '../controllers/authentication';
import upload from '../middlewares/multer';

export default (router: express.Router) => {
    router.post('/auth/register',upload.single("profile"), register);
    router.post('/auth/login', login);
}