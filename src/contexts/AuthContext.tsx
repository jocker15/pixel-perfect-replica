import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getUserProfile } from "@/lib/api";

export interface AuthUser {
  id: string;
  email?: string;
  first_name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, check localStorage for existing token
  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      setToken(stored);
      // Validate token by fetching profile
      getUserProfile()
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
          } else {
            // Token invalid
            localStorage.removeItem("auth_token");
            setToken(null);
          }
        })
        .catch(() => {
          localStorage.removeItem("auth_token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback((newToken: string, newUser: AuthUser) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
