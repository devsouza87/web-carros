import { type InputHTMLAttributes } from "react";
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

type InputProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    name: Path<T>;
    errorMessage?: string;
    register: UseFormRegister<T>;
  };

export const Input = <T extends FieldValues>({
  label,
  name,
  errorMessage,
  register,
  ...rest
}: InputProps<T>) => {
  return (
    <div className="w-full mb-3">
      {label && <label>{label}</label>}

      <input
        className="w-full border rounded-md h-11 px-2 outline-none"
        {...register(name)}
        {...rest}
      />

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
