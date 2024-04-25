import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  numberOfTickets: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Confirmed', 'Cancelled'], default: 'Confirmed' },
});

export const BookingModel = mongoose.model("Booking", bookingSchema);

export const getAllBookings = () => BookingModel.find();

export const getBookingById = (id: string) => BookingModel.findById(id);

export const createBooking = (values: Record<string, any>) =>
  new BookingModel(values).save().then((booking) => booking.toObject());

export const deleteBookingById = (id: string) =>
  BookingModel.findOneAndDelete({ _id: id });

export const updateBookingById = (id: string, values: Record<string, any>) =>
  BookingModel.findByIdAndUpdate(id, values);
export const cancelBookingById = (id: string) =>
    BookingModel.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );
