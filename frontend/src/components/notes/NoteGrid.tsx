import { Col, Container, Row } from 'react-bootstrap';
import type { Note } from '../../model/note';
import { deleteNote } from '../../network/notesApi';
import styles from '../../styles/NotesPage.module.css';
import { UiNote } from './Note';

interface NoteGridProps {
  notes: Note[],
  onNoteDeletion: (updatedNotes: Note[]) => void;
  onNoteClick: (note: Note) => void;
}

export function NoteGrid({ notes, onNoteDeletion, onNoteClick }: NoteGridProps) {

  /**
   * Gets an ID from a note that is deleted when the delete button on the note itself is clicked.
   * @param noteId A note id that will come from the UiNote, once the delete button is clicked.
   */
  const deleteNoteAndUpdateCallback = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      const updatedNotes = notes.filter(note => note._id !== noteId);
      onNoteDeletion(updatedNotes); // Callback function.
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  return (
    <Container className={`m-4 ${styles.notesGrid}`}>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {notes.map(n => (
          <Col key={n._id}>
            <UiNote // Notes are presented here
              note={n}
              className={styles.note}
              onDeleteClicked={(uiNoteId) => { deleteNoteAndUpdateCallback(uiNoteId) }}
              onNoteClicked={(note) => { onNoteClick(note) }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
