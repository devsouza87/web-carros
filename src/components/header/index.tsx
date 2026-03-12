import { FiLogIn, FiUser } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const { signed, loadingAuth } = useContext(AuthContext);

  return (
    <header className="w-full h-16 flex items-center justify-center bg-white drop-shadow mb-4">
      <div className="w-full max-w-7xl h-full flex items-center justify-between px-4 mx-auto">
        <Link to="/">
          <img src={logo} alt="Logo Web Carros" />
        </Link>

        {!loadingAuth && signed && (
          <Link to="/cars">
            <div className="border rounded-full p-2">
              <FiUser size={24} color="#000" />
            </div>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="/cars">
            <div className="border rounded-full p-2">
              <FiLogIn size={24} color="#000" />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};
