import { memo, useState } from "react";

type OptionType = {
  label: string;
  value: string;
};

type SelectType = {
  label?: string;
  defaultOption?: string;
  options: OptionType[];
  onValueChange: (value: string) => void;
};

const Select = memo(
  ({ label, defaultOption, options, onValueChange }: SelectType) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (event: any) => {
      const { value } = event.target;
      setValue(value);
      onValueChange(value);
    };

    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium mb-1 mt-3 text-default-black">
            {label}
          </label>
        )}
        <select
          value={value}
          onChange={handleChange}
          className="w-full border rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option>{defaultOption || "Seleciona uma opção"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
