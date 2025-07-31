import { Card } from "react-bootstrap";
import { MdDelete } from 'react-icons/md';
import type { Note } from "../../model/note";
import styles from '../../styles/Note.module.css';
import utilStyles from '../../styles/Utility.module.css';
import { createdOrUpdated } from '../../utils/formatDate';

interface UiNoteProps {
  note: Note,
  className?: string,
  onDeleteClicked: (id: string) => void,
  onNoteClicked: (note: Note) => void,
}


export const UiNote = ({ note, className, onDeleteClicked, onNoteClicked }: UiNoteProps) => {

  const handleDeleteClick = (e: React.MouseEvent, note: Note) => {
    onDeleteClicked(note._id);
    e.stopPropagation(); // Need to stop propagation, otherwise the click will trigger other functions on the note if we define some.
  }

  return (
    <Card className={`${styles.noteCard} ${className}`} key={note._id} onClick={() => { onNoteClicked(note) }}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={utilStyles.flexCenter}>
          {note.title}
          <MdDelete className='text-muted ms-auto' onClick={(e) => handleDeleteClick(e, note)} />
        </Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdOrUpdated(note)}</Card.Footer>
    </Card>
  );
}
