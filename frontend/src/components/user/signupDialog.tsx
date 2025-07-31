import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form"
import { TextInputField } from "../form/TextInputField";
import { signup } from "../../network/usersApi";
import type { User } from "../../model/user";
import { useState } from "react";
import { ConflictError } from "../../errors/http_errors";

interface SignupDialogProps {
  show: boolean,
  onDismissDialog: () => void,
  onSignUpSuccessful: (user: User) => void,
}

interface SignupInput {
  username: string,
  email: string,
  password: string,
}

export function SignupDialog({ show, onDismissDialog, onSignUpSuccessful }: SignupDialogProps) {

  const [errorText, setErrorText] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignupInput>();

  async function onSubmit(credentials: SignupInput) {

    try {
      const user = await signup(credentials);
      onSignUpSuccessful(user);
      setErrorText(null);
      reset();

    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message)

      } else {
        alert(error);

      }
      console.error(error)

    }
  }

  function dismissAndClearFields() {
    setErrorText(null);
    onDismissDialog();
    reset();
  }

  return (
    <Modal show={show} onHide={dismissAndClearFields}>

      <Modal.Header closeButton>
        <Modal.Title>
          Sign Up
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="danger" show={!!errorText}>{errorText}</Alert>
        <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <TextInputField
              type='text'
              placeholder='Username'
              autoComplete='off'
              name='username'
              label='Username'
              register={register}
              registerOptions={{ required: 'Required' }}
              error={errors.username} />
          </Form.Group>
          <Form.Group className="mb-3">
            <TextInputField
              type='email'
              placeholder='Email'
              autoComplete='off'
              name='email'
              label='Email'
              register={register}
              registerOptions={{ required: 'Required' }}
              error={errors.email} />
          </Form.Group>
          <Form.Group className="mb-3">
            <TextInputField
              type='password'
              placeholder='Password'
              autoComplete='off'
              name='password'
              label='Password'
              register={register}
              registerOptions={{ required: 'Required' }}
              error={errors.password} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="loginForm"
          disabled={isSubmitting}
        >Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  )
}