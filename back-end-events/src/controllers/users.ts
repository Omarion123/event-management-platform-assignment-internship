import {NextFunction, Request, Response} from 'express';

import { deleteUserById, getUser, getUserById } from '../db/users';

import { uploadToCloud } from "../utils/cloudinary";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUser();

        return res.status(200).json({
            message: "User retrived succesfully!",
            user: users,
          });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);
        return res.status(200).json({
            message: "User deleted succesfully!",
            user: deletedUser,
          });
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if(!username){
            return res.status(400).json({
                message: "Wrong input or undefined!",
              });
        }
        let result:any;

        // if(req.file) result = await uploadToCloud(req.file,res)
        if (req.file) {
        result = await uploadToCloud(req.file, res);
        if (!result) {
            return res.status(400).json({
            message: "Error uploading profile picture",
            });
        }
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        user.username = username;
        user.profile = result.secure_url;

        await user.save();
        return res.status(200).json({
            message: "User updated succesfully!",
            user: user,
          }).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}