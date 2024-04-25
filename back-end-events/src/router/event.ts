import express from 'express';
import {
  getAllEvents,
  getEvent,
  createEventController,
  updateEvent,
  deleteEvent,
} from '../controllers/event';
import { isAuthenticated, isAdmin, isUser } from '../middlewares';

export default (router: express.Router) => {
  router.get('/events', getAllEvents);
  router.get('/events/:id', getEvent);
  router.post('/events', isAuthenticated, isAdmin, createEventController);
  router.patch('/events/:id', isAuthenticated, isAdmin, updateEvent);
  router.delete('/events/:id', isAuthenticated, isAdmin, deleteEvent);
};
