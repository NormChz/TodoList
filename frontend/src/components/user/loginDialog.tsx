import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TextInputField } from "../form/TextInputField";
import { login } from "../../network/usersApi";
import type { User } from "../../model/user";
import { useState } from "react";
import { UnauthorizedError } from "../../errors/http_errors";

interface LoginDialogProps {
  show: boolean,
  onDismissDialog: () => void,
  onLoginSuccessful: (user: User) => void,
}

interface LoginInput {
  username: string,
  password: string,
}
//

export function LoginDialog({ show, onDismissDialog, onLoginSuccessful }: LoginDialogProps) {

  const [errorText, setErrorText] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginInput>();

  const onSubmit = async (credentials: LoginInput) => {

    try {
      const loggedInUser = await login(credentials)
      onLoginSuccessful(loggedInUser);
      setErrorText(null);
      reset();

    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
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
          Log In
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="danger" show={!!errorText}>{errorText}</Alert>
        <Form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
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
          form="signupForm"
          disabled={isSubmitting}
        >Log In
        </Button>
      </Modal.Footer>
    </Modal>
  )
}