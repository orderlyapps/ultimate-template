import { useEffect, useCallback } from "react";
import { supabase } from "@supabase-db/client";
import { useAuthStore } from "./useAuthStore";

export const useAuth = () => {
  const { session, user, isLoading, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setSession, setLoading]);

  const signInWithGoogle = useCallback(async () => {
    const redirectTo = import.meta.env.VITE_AUTH_REDIRECT_PATH || "/";
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  }, []);

  return {
    session,
    user,
    isLoading,
    isAuthenticated: !!session,
    signInWithGoogle,
    signOut,
  };
};
