import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseconnection";

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({ uid, name, email }: UserProps) => void;
  user: UserProps | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  uid: string;
  name: string | null;
  email: string | null;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  function handleInfoUser({ uid, name, email }: UserProps) {
    setUser({
      uid,
      name,
      email,
    });
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loadingAuth, user, handleInfoUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
