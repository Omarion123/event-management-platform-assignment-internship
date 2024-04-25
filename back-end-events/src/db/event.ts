import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  ticketAvailability: { type: Number, required: true, min: 0 },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const EventModel = mongoose.model("Event", eventSchema);

export const getEvents = () => EventModel.find().populate("organizer attendees");

export const getEventById = (id: string) => EventModel.findById(id).populate("organizer attendees");

export const createEvent = (values: Record<string, any>) =>
  new EventModel(values).save().then((event) => event.toObject());

export const updateEventById = (id: string, values: Record<string, any>) =>
  EventModel.findByIdAndUpdate(id, values, { new: true });

export const deleteEventById = (id: string) => EventModel.findByIdAndDelete(id);
