interface ButtonProps {
  bg: "bg-red-500" | "bg-zinc-700";
  label: string;
  width?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  bg,
  label,
  width,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${bg} text-white font-medium rounded-md h-10 ${width && "w-full"} px-8 cursor-pointer`}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
