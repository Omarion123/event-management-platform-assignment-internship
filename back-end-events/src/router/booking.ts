import express from 'express';
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
  router.get('/bookings', isAdmin, isUser, getAllBookingsController);
  router.get('/bookings/:id', isAdmin, getBookingController);
  router.post('/bookings', isAuthenticated, isUser, createBookingController);
  router.post('/bookings/:id', isAuthenticated, isUser, cancelBookingController);
  router.patch('/bookings/:id', isAuthenticated,isAdmin, updateBookingController);
  router.delete('/bookings/:id', isAuthenticated, isAdmin, deleteBookingController);
};
