import express from 'express';
import {
  getAllEvents,
  getEvent,
  createEventController,
  updateEvent,
  deleteEvent,
} from '../controllers/event';
import { isAuthenticated, isAdmin } from '../middlewares';
import upload from '../middlewares/multer';


export default (router: express.Router) => {
  router.get('/events', getAllEvents);
  router.get('/events/:id', getEvent);
  router.post('/events', isAuthenticated, isAdmin, upload.single("profile"), createEventController);
  router.patch('/events/:id', isAuthenticated, isAdmin, upload.single("profile"), updateEvent);
  router.delete('/events/:id', isAuthenticated, isAdmin, deleteEvent);
};
