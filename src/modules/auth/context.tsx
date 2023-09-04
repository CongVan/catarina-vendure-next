import { Session } from "next-auth";
import { createContext, useContext } from "react";

type State = {
  session: Session | null;
  isLoggedIn: boolean;
};

const AuthContext = createContext<State>({ session: null, isLoggedIn: false });
export function AuthProvider({ session, children }) {
  return (
    <AuthContext.Provider value={{ session, isLoggedIn: !!session }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const state = useContext(AuthContext);
  return state;
}
