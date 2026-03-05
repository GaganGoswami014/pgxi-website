import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthStep = "idle" | "awaiting_otp";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  authStep: AuthStep;
  pendingEmail: string | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  verifyOtp: (token: string) => Promise<{ error: Error | null }>;
  resendOtp: () => Promise<{ error: Error | null }>;
  cancelOtp: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [authStep, setAuthStep] = useState<AuthStep>("idle");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingPassword, setPendingPassword] = useState<string | null>(null);

  useEffect(() => {

    const checkAdminRole = async (userId: string) => {
      const { data } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });

      setIsAdmin(!!data);
    };

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, currentSession) => {

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          checkAdminRole(currentSession.user.id);
        } else {
          setIsAdmin(false);
        }

      });

    const init = async () => {

      const { data: { session } } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await checkAdminRole(session.user.id);
      }

      setIsLoading(false);
    };

    init();

    return () => subscription.unsubscribe();

  }, []);

  // STEP 1 → check password then send OTP
  const signIn = async (email: string, password: string) => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error };

    // logout temporary session
    await supabase.auth.signOut();

    await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setPendingEmail(email);
    setPendingPassword(password);
    setAuthStep("awaiting_otp");

    return { error: null };

  };

  // STEP 2 → verify OTP then login
  const verifyOtp = async (token: string) => {
    console.log("OTP verify login:", pendingEmail, pendingPassword);
    if (!pendingEmail || !pendingPassword) {
      return { error: new Error("Verification failed") };
    }

    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: pendingEmail,
        otp: token,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return { error: new Error("Invalid OTP") };
    }

    // login after OTP success
    const { error } = await supabase.auth.signInWithPassword({
      email: pendingEmail,
      password: pendingPassword,
    });

    if (error) return { error };

    setAuthStep("idle");
    setPendingEmail(null);
    setPendingPassword(null);

    return { error: null };

  };

  const resendOtp = async () => {

    if (!pendingEmail) {
      return { error: new Error("No pending verification") };
    }

    await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: pendingEmail }),
    });

    return { error: null };

  };

  const cancelOtp = () => {

    setAuthStep("idle");
    setPendingEmail(null);
    setPendingPassword(null);

  };

  const signOut = async () => {

    await supabase.auth.signOut();

    setAuthStep("idle");
    setPendingEmail(null);
    setPendingPassword(null);

  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isAdmin,
        isLoading,
        authStep,
        pendingEmail,
        signIn,
        verifyOtp,
        resendOtp,
        cancelOtp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {

  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;

};