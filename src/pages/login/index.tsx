import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.svg";
import { Container } from "../../components/layout/container";
import { Input } from "../../components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebase/firebaseConnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect } from "react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O campo email é obrigatório")
    .email("Formato de email inválido."),
  password: z.string().min(1, "O campo senha é obrigatório."),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginForm) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        //toast.success("Logado com sucesso!!!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error("Erro ao logar");
        console.error(error);
      });
  };

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);

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
            Acessar
          </button>
        </form>
        <p className="text-gray-700">
          Ainda não possui uma conta?{" "}
          <Link to="/register" className="underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </Container>
  );
};
