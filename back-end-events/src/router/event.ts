import express from 'express';
import {
  getAllEvents,
  getEvent,
  createEventController,
  updateEvent,
  deleteEvent,
} from '../controllers/event';
import { isAuthenticated, isEventOrganizer } from '../middlewares';

export default (router: express.Router) => {
  router.get('/events', isAuthenticated, getAllEvents);
  router.get('/events/:id', isAuthenticated, getEvent);
  router.post('/events', isAuthenticated, createEventController);
  router.patch('/events/:id', isAuthenticated, isEventOrganizer, updateEvent);
  router.delete('/events/:id', isAuthenticated, isEventOrganizer, deleteEvent);
};
