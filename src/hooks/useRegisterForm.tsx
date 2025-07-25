import { useForm } from "react-hook-form";

export type RegisterFormDataType = {
  id?: string;
  title: string;
  description: string;
  category: string;
  priority?: string;
  status?: string;
};

type UseRegisterFormType = {
  onSubmitCallback: (data: RegisterFormDataType) => void;
  defaultValues: RegisterFormDataType;
};

export const useRegisterForm = ({
  onSubmitCallback,
  defaultValues,
}: UseRegisterFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormDataType>({ defaultValues });

  const onSubmit = handleSubmit(onSubmitCallback);

  return {
    register,
    errors,
    isSubmitting,
    onSubmit,
  };
};
