// Importing mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Defining a schema for the User model
const userSchema = new mongoose.Schema({
  // User's username field, which is a required string
  username: { type: String, required: true },
  // User's email field, which is a required string
  email: { type: String, required: true },
  // Profile Image's email field, which is a required string
  profile: { type: String, required: true },
  role: {type: String, required: true},
  // Nested object for authentication-related fields
  authentication: {
    // Password field within authentication object, not selected by default in queries
    password: { type: String, required: true, select: false },
    // Salt field within authentication object, not selected by default in queries
    salt: { type: String, select: false },
    // Session token field within authentication object, not selected by default in queries
    sessionToken: { type: String, select: false },
  },
});

// Creating a UserModel based on the userSchema
export const UserModel = mongoose.model("User", userSchema);

// Function to retrieve all users from the database
export const getUser = () => UserModel.find();

// Function to retrieve a user by their email address
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Function to retrieve a user by their session token
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

// Function to retrieve a user by their ID
export const getUserById = (id: string) => UserModel.findById(id);

// Function to create a new user in the database
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

// Function to delete a user by their ID
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

// Function to update a user by their ID with provided values
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
