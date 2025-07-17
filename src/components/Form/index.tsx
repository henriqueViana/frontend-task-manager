import type { FormEventHandler, ReactNode } from "react";

type FormType = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  className: string;
};

const Form = ({ onSubmit, children, className }: FormType) => (
  <form onSubmit={onSubmit} className={className}>
    {children}
  </form>
);

export default Form;
