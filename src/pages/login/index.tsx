import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import Container from "../../components/container";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseconnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Digite um email válido"),
  password: z.string().nonempty("A senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          toast.error("Email ou senha incorretos!");
        } else {
          toast.error("Erro ao realizar login!");
        }
      });
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  return (
    <Container>
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
        <Link to="/" className="mb-6 w-full max-w-sm">
          <img src={logo} alt="Logo Web Carros" className="w-full" />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl bg-white rounded-lg p-4"
        >
          <Input
            type="email"
            placeholder="Digite seu email"
            name="email"
            error={errors.email?.message}
            register={register}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            name="password"
            error={errors.password?.message}
            register={register}
          />

          <button
            type="submit"
            className="w-full h-10 bg-black text-white font-medium rounded-lg"
          >
            Acessar
          </button>
        </form>
        <Link to={"/register"} className="underline">
          Ainda não possui uma conta? Registre-se
        </Link>
      </div>
    </Container>
  );
}
