import type { Note } from "../../model/note";

interface NoNotesNotificationProps {
  notes: Note[],
  loadNotesError: boolean,
  notesLoading: boolean,
}

export function NoNotesNotification({ notes, loadNotesError, notesLoading }: NoNotesNotificationProps) {
  if (!loadNotesError && !notesLoading) {
    if (notes.length === 0) {
      return (
        <p>There are no nodes yet</p>
      );
    }
  }
}