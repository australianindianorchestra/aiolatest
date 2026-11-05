"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredSession } from "@/lib/auth";
import type { AuthSession } from "@/lib/auth";

type UserRole = "customer" | "administrator" | "user";

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function AuthGate({
  role,
  children,
}: {
  role: UserRole;
  children: ReactNode | ((session: AuthSession) => ReactNode);
}) {
  const router = useRouter();

  // Always start as not-ready so server HTML matches initial client HTML (no hydration mismatch)
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  // useLayoutEffect fires synchronously after DOM mutations but before the browser
  // paints — so the switch from spinner → dashboard happens in the same frame,
  // making it invisible to the user while still being safe for hydration.
  useIsomorphicLayoutEffect(() => {
    const currentSession = getStoredSession();

    if (!currentSession) {
      router.replace("/login");
      return;
    }

    const isAdmin = currentSession.role === "administrator";
    const expectedAdmin = role === "administrator";

    if (isAdmin !== expectedAdmin) {
      router.replace(isAdmin ? "/dashboard/admin" : "/dashboard/user");
      return;
    }

    setSession(currentSession);
    setReady(true);
  }, [role, router]);

  if (!ready || !session) {
    // Minimal spinner — matches SSR output, only visible for one frame on client
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[var(--red)]" />
      </div>
    );
  }

  if (typeof children === "function") {
    return <>{children(session)}</>;
  }

  return <>{children}</>;
}
