import type { InputHTMLAttributes } from "react";
import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type InputProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    rules?: RegisterOptions<T, Path<T>>;
    error?: string;
  };

export const Input = <T extends FieldValues>({
  label,
  name,
  register,
  rules,
  error,
  ...rest
}: InputProps<T>) => {
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
