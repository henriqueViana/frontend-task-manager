import { memo, useState, type ChangeEvent } from "react";

type InputType = {
  type: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const Input = memo(
  ({ type, onValueChange, placeholder, className }: InputType) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValue(value);
      onValueChange(value);
    };

    return (
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
      />
    );
  }
);

export default Input;
