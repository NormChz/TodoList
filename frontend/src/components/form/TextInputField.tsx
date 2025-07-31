import { Form } from "react-bootstrap";
import type { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

// interface CreateUserInput {
//   username: string,
//   email: string,
//   password: string,
// }

export interface TextInputFieldProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>, // Path is a type for a field name, such as title, text, username, email or password. 
  label: string, // label is just a string to put in the Label div
  register: UseFormRegister<TFormValues>,
  registerOptions?: RegisterOptions<TFormValues, Path<TFormValues>>,
  error?: FieldError,
  [x: string]: unknown | ((...args: unknown[]) => unknown),
};

export function TextInputField <TFieldValues extends FieldValues>({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldProps<TFieldValues>) {

  const labelToInputID = String(name) + '-input';
  
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={labelToInputID}>
        {label}
      </Form.Label>
      <Form.Control
        id={labelToInputID}
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
