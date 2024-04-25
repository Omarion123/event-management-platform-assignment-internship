// Import the Express framework and the Request, Response types from Express
import { Request, Response } from "express";

// Import createUser and getUserByEmail functions from "../db/users" file
import { createUser, getUserByEmail } from "../db/users";

// Import authentication and random functions from "../helpers" file
import { authentication, random } from "../helpers";

import { uploadToCloud } from "../utils/cloudinary";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(`email is: ${email} password is: ${password}`);

    // Check if any of email or password is missing, return a 400 status code if true
    if (!email || !password) {
      return res.status(400).json({
        message: "Check your inputs!",
      });
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials!",
      });
    }

    // Check if user.authentication is defined and not null
    if (user.authentication && user.authentication.salt) {
      const expectedHash = authentication(user.authentication.salt, password);
      // Continue with your authentication logic using expectedHash
      if (user.authentication.password !== expectedHash) {
        return res.status(403).json({
          message: "Incorrect credentials!",
        });
      }

      const salt = random();
      user.authentication.sessionToken = authentication(salt, user._id.toString());
      await user.save();
      res.cookie('GHOST-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })
      return res.status(200).json({
        user: user,
        message: "Succesfully logged in!",
      });

    } else {
      return res.status(400).json({
        message: "User authentication information missing!",
      });
    }


  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

// Define the register function as an asynchronous function that takes a Request and Response object
export const register = async (req: Request, res: Response) => {
  try {
    // Extract email, password, and username from the request body
    const { email, password, username, role } = req.body;
    console.log(`email is: ${email} password is: ${password} username is: ${username} role is: ${role} `);
    


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

    // Check if any of email, password, or username is missing, return a 400 status code if true
    if (!email || !password || !username ) {
      return res.status(400).json({
        message: "Check your inputs!",
      });
    }

    // Check if a user with the provided email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      // Return a 400 status code if the user already exists
      return res.status(400).json({
        message: "User already exist!",
      });
    }

    // Generate a random salt
    const salt = random();

    // Create a new user in the database with the provided email, username, salt, and hashed password
    const user = await createUser({
      email,
      username,
      profile: result.secure_url,
      role,
      authentication: {
        salt,
        password: authentication(salt, password), // Hash the password using the salt and authentication helper function
      },
    });

    // Return a 200 status code with the created user object as JSON response
    return res.status(200).json(user).end();
  } catch (error: any) {
    // If an error occurs during the registration process, log the error and return a 400 status code
    console.log(error);
    // return res.sendStatus(400);
    return res.status(500).json({
      error: error.message,
    });
  }
};
