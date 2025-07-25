import { useRegister } from "../../../hooks/useRegister";
import { useRegisterForm } from "../../../hooks/useRegisterForm";
import { Input } from "./Input";

type FormProps = {
  onSubmit: (data: any) => void;
};

export const Form = ({ onSubmit }: FormProps) => {
  const { priorityOptions, statusOptions, task } = useRegister();

  const {
    register,
    errors,
    onSubmit: handleSubmit,
  } = useRegisterForm({ onSubmitCallback: onSubmit, defaultValues: task });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-xl w-full"
    >
      <Input label="Título *" error={errors.title?.message}>
        <input
          type="text"
          className="w-full mt-1 border rounded p-2 text-default-black"
          {...register("title", {
            required: "Título é obrigatório",
            minLength: {
              value: 3,
              message: "Título deve ter pelo menos 3 caracteres",
            },
          })}
        />
      </Input>
      <Input label="Descrição *" error={errors.description?.message}>
        <input
          type="text"
          className="w-full mt-1 border rounded p-2 text-default-black"
          {...register("description", {
            required: "Descrição é obrigatório",
            minLength: {
              value: 3,
              message: "Descrição deve ter pelo menos 3 caracteres",
            },
          })}
        />
      </Input>
      <Input label="Categoria *" error={errors.category?.message}>
        <input
          type="text"
          className="w-full mt-1 border rounded p-2 text-default-black"
          {...register("category", {
            required: "Categoria é obrigatório",
            minLength: {
              value: 3,
              message: "Categoria deve ter pelo menos 3 caracteres",
            },
          })}
        />
      </Input>
      <Input label="Prioridade *" error={errors.priority?.message}>
        <select
          {...register("priority", { required: "Prioridade é obrigatório" })}
          className="w-full border rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">Selecione uma opção</option>
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Input>
      <Input label="Status *" error={errors.status?.message}>
        <select
          {...register("status", { required: "Status é obrigatório" })}
          className="w-full border rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">Selecione uma opção</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Input>
      <button
        type="submit"
        className="bg-blue-500 mt-4 text-white w-full rounded p-2"
      >
        {task.id ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
};
