import { Router } from "express";
import { notesController } from "../controller/notesController";

export const notesRouter = Router();

notesRouter.get('/', notesController.getNotes);

// notesRouter.get('/:id', notesController.getNote);

notesRouter.post('/create', notesController.createNote);

notesRouter.patch('/:id', notesController.updateNote); // EX URL: http://localhost:5000/api/notes/68656cb102ea0e6a499b0642

notesRouter.delete('/:id', notesController.deleteNote);


