import express from 'express';
import upload from '../middlewares/multer';
import {
  getAllBookingsController,
  getBookingController,
  createBookingController,
  updateBookingController,
  deleteBookingController,
  cancelBookingController,
} from '../controllers/booking';
import { isAuthenticated, isAdmin, isUser } from '../middlewares';

export default (router: express.Router) => {
  router.get('/bookings/:id', isAdmin, getBookingController);
  router.get('/bookings', isUser, getAllBookingsController);
  router.get('/bookingsadmin', isAdmin, getAllBookingsController);
  router.post('/bookings', isAuthenticated, isUser, createBookingController);
  router.post('/bookings/:id', isAuthenticated, isUser, cancelBookingController);
  router.patch('/bookings/:id', isAuthenticated,isAdmin,upload.single("profile"), updateBookingController);
  router.delete('/bookings/:id', isAuthenticated, isAdmin, deleteBookingController);
};
