import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import type { Note } from "../model/note";
import type { User } from "../model/user";
import { fetchAllNotes } from "../network/notesApi";
import styleUtils from '../styles/Utility.module.css';
import { AddAndEditNoteDialog } from "../components/notes/AddNoteDialog";
import { NoNotesNotification } from "../components/notes/NoNotesNotification";
import { NoteGrid } from "../components/notes/NoteGrid";

interface NotesPageLoggedInViewProps {
  loggedInUser: User | null,
}

export function NotesPageLoggedInView({ loggedInUser }: NotesPageLoggedInViewProps) { // user = LoggedInUser

  const [notes, setNotes] = useState<Note[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [notesLoading, setNotesLoading] = useState(false);
  const [loadNotesError, setLoadNotesError] = useState(false);

  const handleNoteSaving = (n: Note) => {
    setNotes([...notes, n]);
    dismissAddEditNoteDialog();
  };

  const handleNoteDeletion = (upN: Note[]) => {
    setNotes(upN);
  }

  const handleNoteEditing = (upN: Note) => {
    const updatedNotes = notes.map(exN => exN._id === upN._id ? upN : exN)
    setNotes(updatedNotes);
    dismissAddEditNoteDialog();
  }

  const dismissAddEditNoteDialog = () => {
    setShowAddNoteDialog(false)
    setSelectedNote(undefined)
  }

  useEffect(() => {

    async function getNotes() {
      try {
        setNotesLoading(true);
        setLoadNotesError(false);
        const notes = await fetchAllNotes();
        setNotes(notes);

      } catch (error) {
        console.error('Failed to fetch notes: ', error);
        // alert(error);
        setLoadNotesError(true);
      } finally {
        setNotesLoading(false);
        
      }
    };
    if (loggedInUser) {
      getNotes();
    } else {
      setNotes([]);
    }
  }, [loggedInUser])

  return (
    <Container hidden={!!loggedInUser === false} className={styleUtils.flexColumnCenter} /* HIDE IF USER IS NULL */>
      <Button
        onClick={() => setShowAddNoteDialog(true)}
        className={styleUtils.blockCenter}
        hidden={loadNotesError}>+ add note</Button>
      <Spinner
        hidden={!notesLoading}
        animation='border'
        variant='primary' />
      <p hidden={!loadNotesError}>Something went wrong. Please refresh the page.</p>
      <NoNotesNotification
        notes={notes}
        loadNotesError={loadNotesError}
        notesLoading={notesLoading} />
      <NoteGrid
        notes={notes}
        onNoteDeletion={(updatedNotes) => handleNoteDeletion(updatedNotes)}
        onNoteClick={(note) => { setSelectedNote(note) }} />
      <AddAndEditNoteDialog
        show={!!selectedNote || showAddNoteDialog}
        onDismiss={() => dismissAddEditNoteDialog()}
        onCreatedNoteSaved={(note) => handleNoteSaving(note)}
        noteToEdit={selectedNote}
        onEditedNoteSaved={(uNote) => handleNoteEditing(uNote)} />
    </Container>
  );
}
