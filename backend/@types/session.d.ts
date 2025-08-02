import mongoose from "mongoose";

/**
 * This is the way to declare additional properties on the session object.
 * In order to take effect, the declaration must be inside a file named like this file,
 * and in a folder called @types so that typescript knows where to find it.
 */
declare module 'express-session' {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}