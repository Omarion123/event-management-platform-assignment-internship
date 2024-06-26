import { NextFunction, Request, Response } from 'express';
import { getUserBySessionToken } from "../db/users";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingById,
  deleteBookingById,
  cancelBookingById,
} from '../db/booking';

export const getAllBookingsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getAllBookings();

    return res.status(200).json({
      message: 'Bookings retrieved successfully!',
      bookings: bookings,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getBookingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const booking = await getBookingById(id);
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found',
      });
    }

    return res.status(200).json({
      message: 'Booking retrieved successfully!',
      booking: booking,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createBookingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId, numberOfTickets, bookingDate } = req.body;
    console.log(`eventId is: ${eventId}, numberOfTickets is: ${numberOfTickets}, bookingDate is: ${bookingDate},`);
    

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

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({
        message: "No session token and user",
      });
    }
    const id = existingUser._id.toString();

    // Check if any required data is missing
    if (!eventId || !numberOfTickets || !bookingDate) {
        return res.status(400).json({ message: 'Missing required data in request body' });
      }

    const newBooking = await createBooking({
      userId: id,
      eventId,
      numberOfTickets,
      bookingDate,
    });

    return res.status(201).json({
      message: 'Booking created successfully!',
      booking: newBooking,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateBookingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { numberOfTickets, bookingDate, status } = req.body;
    console.log("the id is: ", id);
    
    console.log(`numberOfTickets: ${numberOfTickets}, bookingDate: ${bookingDate}, status: ${status}, `);
    

    // Check if all required fields are present in the request body
    if (!numberOfTickets || !bookingDate || !status) {
        return res.status(400).json({
          message: 'Invalid inputs. Please provide all required fields: numberOfTickets, bookingDate, status.',
        });
      }

    const updatedBooking = await updateBookingById(id, {
      numberOfTickets,
      bookingDate,
      status,
    });

    if (!updatedBooking) {
      return res.status(404).json({
        message: 'Booking not found',
      });
    }

    return res.status(200).json({
      message: 'Booking updated successfully!',
      booking: updatedBooking,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteBookingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedBooking = await deleteBookingById(id);
    if (!deletedBooking) {
      return res.status(404).json({
        message: 'Booking not found',
      });
    }

    return res.status(200).json({
      message: 'Booking deleted successfully!',
      booking: deletedBooking,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const cancelBookingController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
  
      const cancelledBooking = await cancelBookingById(id);
      if (!cancelledBooking) {
        return res.status(404).json({
          message: 'Booking not found',
        });
      }
  
      return res.status(200).json({
        message: 'Booking cancelled successfully!',
        booking: cancelledBooking,
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
