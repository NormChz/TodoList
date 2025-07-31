import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import type { Note } from "../../model/note";
import { createNote, updateNote, type CreateUpdateNoteInput } from "../../network/notesApi";

interface AddAndEditNoteDialogProps {
  show: boolean,
  onDismiss: () => void,
  onCreatedNoteSaved: (note: Note) => void,
  onEditedNoteSaved: (note: Note) => void,
  noteToEdit?: Note
}

// NOTE: spread syntax on register {...register('firstname')} does something like this:
// const { onChange, onBlur, name, ref } = register('firstName'); 

export function AddAndEditNoteDialog({ show, onDismiss, onCreatedNoteSaved, onEditedNoteSaved, noteToEdit }: AddAndEditNoteDialogProps) {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateUpdateNoteInput>(
    {
      values: {
        title: noteToEdit?.title || '',
        text: noteToEdit?.text || '',
      }
    }
  );

  /* this is an alternative to values: {title: noteToEdit?.title || '', text: noteToEdit?.text || ''}
   * useEffect(() => {
   * This effect runs whenever 'noteToEdit' changes.
   * It will reset the form fields with the new noteToEdit's values.
   * console.log('RESETTING');
   * reset({
   * title: noteToEdit?.title || '',
   * text: noteToEdit?.text || '',
   * });
   * }, [noteToEdit, user, reset]); */

  async function onSubmit(formInput: CreateUpdateNoteInput) {
    
    try {
      let noteResponse: Note;

      if (noteToEdit) {
        noteResponse = await updateNote(noteToEdit._id, formInput);
        onEditedNoteSaved(noteResponse);

      } else {
        noteResponse = await createNote(formInput);
        onCreatedNoteSaved(noteResponse); // give the noteresponse to the callback function.

      }
      reset(); // resets all the fields in the form.

    } catch (error) {
      console.error(error)
      alert(error);
    } finally {
      dismissAndClearFields();
    }
  }

  function dismissAndClearFields() {
    reset();
    onDismiss();
  }

  return (
    <Modal show={show} onHide={dismissAndClearFields}>
      <Modal.Header closeButton >
        <Modal.Title>
          {noteToEdit ? 'Edit note' : 'Add note'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="titleField">
              Title
            </Form.Label>
            <Form.Control
              id="titleField"
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register('title', { required: true })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="textField">
              Text
            </Form.Label>
            <Form.Control
              id="textField"
              as='textarea'
              rows={5}
              placeholder="Text"
              {...register('text')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addEditNoteForm"
          disabled={isSubmitting}
        >Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}