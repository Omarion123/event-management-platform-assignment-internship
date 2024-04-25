import { NextFunction, Request, Response } from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
} from '../db/event';

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await getEvents();

    return res.status(200).json({
      message: 'Events retrieved successfully!',
      events: events,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const event = await getEventById(id);
    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      message: 'Event retrieved successfully!',
      event: event,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createEventController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, date, location, ticketAvailability, organizer } = req.body;
    console.log(`title is: ${title} date is: ${date} location is: ${location} ticketAvailability is: ${ticketAvailability} organizer is: ${organizer} `);
    

    const newEvent = await createEvent({
      title,
      date,
      location,
      ticketAvailability,
      organizer,
    });

    return res.status(201).json({
      message: 'Event created successfully!',
      event: newEvent,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, date, location, ticketAvailability, organizer } = req.body;

    const updatedEvent = await updateEventById(id, {
      title,
      date,
      location,
      ticketAvailability,
      organizer,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      message: 'Event updated successfully!',
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedEvent = await deleteEventById(id);
    if (!deletedEvent) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      message: 'Event deleted successfully!',
      event: deletedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
