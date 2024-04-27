import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

import { Types } from "mongoose"; // Import Types from Mongoose

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserIdObj = get(req, "identity._id") as
      | Types.ObjectId
      | undefined; // Use Types.ObjectId
    const currentUserId = currentUserIdObj
      ? currentUserIdObj.toString()
      : undefined; // Convert ObjectId to string
    // console.log("current user id: ", currentUserId);
    // console.log("type of current user id: ", typeof currentUserId);
    // console.log("id is: ", id);

    if (!currentUserId) {
      return res.sendStatus(403); // Send status directly
    }

    if (currentUserId !== id) {
      return res.sendStatus(403); // Send status directly
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader === undefined) {
      return res.status(403).json({
        message: "Invalid session token undefined",
      });
    }

    let sessionToken: string | undefined;
    if (authHeader.startsWith("Bearer ")) {
      sessionToken = authHeader.substring(7); // Remove "Bearer " from the beginning
    } else {
      sessionToken = authHeader; // If "Bearer " is not present, use the entire header value as sessionToken
    }
    console.log(sessionToken);
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).json({
        message: "Invalid session token ",
      });
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const checkUserRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if (authHeader === undefined) {
        return res.status(403).json({
          message: "Invalid session token undefined",
        });
      }

      let sessionToken: string | undefined;
      if (authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.substring(7); // Remove "Bearer " from the beginning
      } else {
        sessionToken = authHeader; // If "Bearer " is not present, use the entire header value as sessionToken
      }
      console.log(sessionToken);
      const existingUser = await getUserBySessionToken(sessionToken);
      if (!existingUser) {
        return res.status(403).json({
          message: "No session token and user",
        });
      }

      // Check if the user is an admin
      if (allowedRoles.includes("admin") && existingUser.role === "admin") {
        merge(req, { identity: existingUser });
        return next();
      }

      // Check if the user is a regular user
      if (allowedRoles.includes("user") && existingUser.role === "user") {
        merge(req, { identity: existingUser });
        return next();
      }

      return res.status(403).json({
        message: "Insufficient privileges",
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
};

// For admin privileges
export const isAdmin = checkUserRole(["admin"]);

// For user privileges
export const isUser = checkUserRole(["user"]);
