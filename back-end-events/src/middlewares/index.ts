import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

import { Types } from 'mongoose'; // Import Types from Mongoose
import { EventModel } from '../db/event'

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserIdObj = get(req, "identity._id") as Types.ObjectId | undefined; // Use Types.ObjectId
    const currentUserId = currentUserIdObj ? currentUserIdObj.toString() : undefined; // Convert ObjectId to string
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
    const sessionToken = req.cookies["GHOST-AUTH"];
    if (!sessionToken) {
      return res.status(403).json({
        message: "No session token",
      });
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({
        message: "No session token and user",
      });
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isEventOrganizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id);
    
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const currentUserIdObj = get(req, "identity._id") as Types.ObjectId | undefined;
    const currentUserId = currentUserIdObj ? currentUserIdObj.toString() : undefined;

    if (!currentUserId || event.organizer.toString() !== currentUserId) {
      return res.status(403).json({
        message: "You are not the organizer of this event",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
