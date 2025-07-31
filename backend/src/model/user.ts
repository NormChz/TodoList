import { InferSchemaType, model, Schema } from "mongoose";


// select: false means that if we retrieve a user from the DB,
// the email and pw will not be returned, unless specifically requested.
// unique: true means that the request will not be fulfilled if a doc with the
// same detail is found in the collection.
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, select: false, unique: true },
});

type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>('User', userSchema);