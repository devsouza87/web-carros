import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConnection";

export const PanelHeader = () => {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="w-full flex items-center gap-4 h-10 rounded-md bg-red-500 text-white font-medium px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Cadastrar Veiculo</Link>

      <button className="ml-auto cursor-pointer" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};
