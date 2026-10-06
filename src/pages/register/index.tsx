import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  name: z.string().min(2, "O campo nome deve ter 2 ou mais caracteres."),
  email: z
    .string()
    .min(1, "O campo email é obrigatório")
    .email("Formato de email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginForm) => {
    console.log("Dados validados e enviados:", data);
    reset();
  };

  return (
    <Container>
      <div className="w-full min-h-dvh flex flex-col justify-center items-center">
        <Link to="/" className="mb-6 w-full max-w-sm">
          <img src={logo} alt="Logo do Web Carros" className="w-full" />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full max-w-xl rounded-lg p-4 mb-4"
        >
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            errorMessage={errors.name?.message}
            register={register}
          />
          <Input
            type="email"
            name="email"
            placeholder="Digite seu email"
            errorMessage={errors.email?.message}
            register={register}
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            errorMessage={errors.password?.message}
            register={register}
          />
          <button
            type="submit"
            className="bg-zinc-900 text-zinc-100 font-medium w-full rounded-md h-11 cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-gray-700">
          Ja possui uma conta?{" "}
          <Link to="/login" className="underline">
            Faça login
          </Link>
        </p>
      </div>
    </Container>
  );
};
