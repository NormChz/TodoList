import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({ // Schema defines the structure of documents in a mongoDB collection
  title: {type: String , required: true}, // title must be specified
  authorID: {type: Schema.Types.ObjectId, reqired: true},
  text: {type: String}, // can exist without a text
}, { timestamps: true }); // tell Mongoose to automatically add two fields to the schema: createdAt and updatedAt

// generates a TypeScript type that represents the shape of documents in the collection
type Note = InferSchemaType<typeof noteSchema>;

// create the Mongoose model. "Note": is the name of the collection in the DB that this model will interact with. 
// Mongoose will automatically pluralize this name to "notes" when interacting with the database.
// The NoteModel can also be seen as the DB. For example, we can query NoteModel with NoteModel.find().
// In fact, we import the model in controller and interact with it as the gateway through which we access the data in the DB. 
// ex: const note = await NoteModel.findById(noteId).exec()
export const NoteModel =  model<Note>('Note', noteSchema);