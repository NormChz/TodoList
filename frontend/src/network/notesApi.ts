import type { Note } from "../model/note";
import { fetchData } from "./genFetchData";

/**
 * Get all notes with GET.
 *
 * @returns json note data.
 */
export const fetchAllNotes = async (): Promise<Note[]> => {
  const response = await fetchData(import.meta.env.VITE_API_BASE_URL + '/notes', { method: 'GET', credentials: 'include' });
  return response.json();
}

export interface CreateUpdateNoteInput {
  title: string,
  text?: string,
}

/**
 * Create a note with POST.
 *
 * @param note Title and optional text.
 * @returns json note data.
 */
export const createNote = async (note: CreateUpdateNoteInput): Promise<Note> => {

  const response = await fetchData(import.meta.env.VITE_API_BASE_URL + '/notes/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note),
    credentials: 'include',
  })

  return response.json();
}

/**
 * Delete a note with DELETE.
 *
 * @param id The id to look up the note in the DB.
 */
export const deleteNote = async (noteID: string) => {

  await fetchData(import.meta.env.VITE_API_BASE_URL + '/notes/' + noteID, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  });
}

/**
 * Update the note with PATCH.
 *
 * @param id The ID to look up the note in the DB.
 * @param note The title and optional text.
 * @returns The json note data.
 */
export const updateNote = async (id: string, note: CreateUpdateNoteInput): Promise<Note> => {

  const response = await fetchData(import.meta.env.VITE_API_BASE_URL + '/notes/' + id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note),
    credentials: 'include',
  });

  return response.json()
}