import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseconnection";

export default function PanelHeader() {
  function handleLogout() {
    signOut(auth);
  }

  return (
    <div className="w-full h-10   bg-red-500 text-white flex items-center gap-4 px-4 rounded-lg mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Novo carro</Link>

      <button onClick={handleLogout} className="ml-auto">
        Sair da conta
      </button>
    </div>
  );
}
