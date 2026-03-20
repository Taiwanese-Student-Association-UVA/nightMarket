import type { ReactNode } from "react";
import { useEffect } from "react";

type Props = {
  children: ReactNode;
  openLogin: () => void;
};

export default function ProtectedRoute({ children, openLogin }: Props) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      openLogin();
    }
  }, [token, openLogin]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}