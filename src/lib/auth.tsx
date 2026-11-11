"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { ADMIN_EMAIL, auth } from "./firebase";

type State = { user: User | null; loading: boolean; isAdmin: boolean };
const Ctx = createContext<State>({ user: null, loading: true, isAdmin: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => onAuthStateChanged(auth(), (u) => { setUser(u); setLoading(false); }), []);
  const isAdmin = !!user && user.emailVerified && user.email === ADMIN_EMAIL;
  return <Ctx.Provider value={{ user, loading, isAdmin }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
