import { AppStorageKeys, AppStorageService } from "@/services/storage";
import { ToastService } from "@/services/toast";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user?: any | null;
  token?: string | null;
  loading?: boolean;
  signOut: () => void;
  getUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(false);
  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    const user = await AppStorageService.getItemAsync(AppStorageKeys.User);
    if (user) {
      const givenDate = new Date(user?.expires_at); 
      const now = new Date();
      if (givenDate < now) {
        setUser(null);
        setToken(null);
        await AppStorageService.removeItemAsync(AppStorageKeys.User);
      } else {
        setUser(user?.data ?? null);
        setToken(user?.token ?? null);
      }
    }
    setLoading(false);
  };

  const signOut = async () => {
    await AppStorageService.removeItemAsync(AppStorageKeys.User);
    router.push("/(auth)/sign-in");
    ToastService.Success("Signed Out Successfully");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        signOut,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
