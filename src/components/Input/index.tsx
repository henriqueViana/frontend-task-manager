import { memo, useState, type ChangeEvent } from "react";
import { validationMap } from "../../utils/error-input-handler";

type InputType = {
  type: "text" | "email" | "phone" | "password";
  label?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const Input = memo(
  ({ type, label, onValueChange, placeholder, className }: InputType) => {
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      // TODO - fazer um debounce
      const { value } = event.target;
      setValue(value);
      onValueChange(value);
    };

    return (
      <>
        {label && (
          <label className="block text-sm font-medium mb-1 mt-3 text-default-black">
            {label}
          </label>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={() => {
            if (type in validationMap) {
              setError(
                validationMap[type as keyof typeof validationMap](value)
              );
            }
          }}
          onFocus={() => setError("")}
          placeholder={placeholder}
          className={`${className} ${error ? "border-red-500" : ""}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </>
    );
  }
);

export default Input;
