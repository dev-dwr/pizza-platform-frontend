"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "../utils/types";

interface UI {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
}

export const UIContext = createContext<UI>({
  login: (user) => {},
  logout: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export default function UIContextProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, []);

  const login = useCallback((user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(undefined);
  }, []);

  return (
    <UIContext.Provider value={{ user, login, logout }}>
      {children}
    </UIContext.Provider>
  );
}
