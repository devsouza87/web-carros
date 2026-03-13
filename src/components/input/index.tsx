import type { InputHTMLAttributes } from "react";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: string;
};

export const Input = ({
  label,
  name,
  register,
  rules,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className="w-full md:mb-4">
      {label && (
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        {...register(name, rules)}
        {...rest}
        className="w-full h-10 border rounded-lg px-2"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
