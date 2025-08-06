import { RequestHandler } from "express";
import { NoteModel } from "../model/note.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../utils/assertIsDefined.js";

interface NotesController {
  getNotes: RequestHandler,
  // getNote: RequestHandler<FindNoteParams, unknown, unknown, unknown>,
  createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown>,
  updateNote: RequestHandler<FindNoteParams, unknown, UpdateNoteBody, unknown>,
  deleteNote: RequestHandler,
}

/**
 * We use the interface to give a type to the values that stem from the request body during a note creation.
 */
interface CreateNoteBody {
  title?: string, // optional bcs we are not guaranteed that the user sends a title (even if for mongoose it is necessary)
  text?: string, // optional bcs we are not guaranteed that the user sends a text
}

interface UpdateNoteBody {
  _id?: string,
  title?: string,
  text?: string,
}

interface FindNoteParams {
  id?: string,
}

interface UpdatedNote {
  title?: string,
  text?: string,
}

export const notesController: NotesController = {

  getNotes: async (req, res, next) => {
    const authId = req.session.userId;

    try {
      assertIsDefined(authId);

      const notes = await NoteModel.find({ authorID: authId });
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  },

  // getNote: async (req, res, next) => {
  //   const noteId = req.params.id;
  //   const authId = req.session.userId;

  //   try {
  //     assertIsDefined(authId);

  //     if (!mongoose.isValidObjectId(noteId))
  //       return next(createHttpError(400, 'Invalid note ID'));

  //     const note = await NoteModel.findById(noteId);

  //     if (!note)
  //       return next(createHttpError(404, 'Note not found'));

  //     console.log();

  //     if (!note.authorID?.equals(authId))
  //       throw(createHttpError(401, 'You cannot access this note.'))

  //     res.status(200).json(note);

  //   } catch (error) {
  //     console.log(error);

  //     next(error);
  //   }
  // },

  createNote: async (req, res, next) => {

    const title = req.body.title;
    const text = req.body.text;
    const authorID = req.session.userId;

    try {
      assertIsDefined(authorID);

      if (!title) {
        return next(createHttpError(400, 'Note must have a title'));
      }

      const createdNote = await NoteModel.create({ title: title, text: text, authorID: authorID });

      res.status(201).json(createdNote); // 201 = resource created
    } catch (error) {
      console.log(error);

      next(error);
    };

  },

  updateNote: async (req, res, next) => {

    const noteID = req.params.id;
    const title = req.body.title;
    const text = req.body.text;

    const authorID = req.session.userId; // From session

    try {

      assertIsDefined(authorID);

      if (!mongoose.isValidObjectId(noteID))
        return next(createHttpError(400, 'Invalid note ID'));

      const isTitleProvided = typeof title === 'string';
      const isTextProvided = typeof text === 'string'; // check must be like this, because checking for if (text) will result to false if the text is just an empty string ""

      if (!isTitleProvided && !isTextProvided)
        return next(createHttpError(400, 'No changes to note detected'))

      const note = await NoteModel.findById(noteID);

      if (!note)
        return next(createHttpError(404, 'Note not found'));

      if (!note.authorID?.equals(authorID))
        return next(createHttpError(401, 'Only author can update note'));

      const update: UpdatedNote = {};
      if (isTitleProvided && title !== note.title)
        update.title = title;
      if (isTextProvided && text !== note.text)
        update.text = text

      if (Object.values(update).length === 0) {
        res.status(200).json(note); // Sending the same note (no updates)
      } else {
        const updatedNote = await NoteModel.findOneAndUpdate({ _id: noteID, authorID: authorID }, update, { returnDocument: 'after' });
        res.status(200).json(updatedNote);
      }
    } catch (error) {
      next(error);
    };
  },

  deleteNote: async (req, res, next) => {

    const noteID = req.params.id;
    const authorID = req.session.userId; // From session

    try {

      assertIsDefined(authorID);

      if (!mongoose.isValidObjectId(noteID))
        return next(createHttpError(400, 'Invalid note ID'));

      const note = await NoteModel.findById(noteID);

      if (!note)
        return next(createHttpError(404, 'Note not found'));

      if (!note.authorID?.equals(authorID)) // critical check
        return next(createHttpError(401, 'Only author can delete note'))

      await NoteModel.deleteOne({ _id: noteID, authorID: authorID })
      res.sendStatus(204);
    } catch (error) {
      next(error);
    };
  }
};