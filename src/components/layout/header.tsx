import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import { FiUser, FiLogIn } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const { signed, loadingAuth } = useContext(AuthContext);

  return (
    <header className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <div className="w-full max-w-7xl flex items-center justify-between px-4 mx-auto">
        <Link to="/">
          <img src={logo} alt="Logo do site" />
        </Link>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <div className="border border-gray-700 rounded-full p-1">
              <FiUser size={24} color="#000" />
            </div>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="/login">
            <FiLogIn size={24} color="#000" />
          </Link>
        )}
      </div>
    </header>
  );
};
