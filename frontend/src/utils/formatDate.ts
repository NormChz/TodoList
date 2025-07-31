import type { Note } from "../model/note";

/**
 * Checks if a note was recently updated.
 *
 * @param note The note to be checked.
 * @returns A string with the date in UTC format.
 */
export const createdOrUpdated = (note: Note): string => {
  if (note.createdAt !== note.updatedAt) {
    return `Updated: ${_formatDate(note.updatedAt)}`;
  }
  return `Created: ${_formatDate(note.createdAt)}`
}

export function _formatDate (dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}