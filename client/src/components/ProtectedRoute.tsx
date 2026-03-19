import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  openLogin: () => void;
};

export default function ProtectedRoute({ children, openLogin }: Props) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>You need to log in to view this page.</h2>
        <button onClick={openLogin}>Login</button>
      </div>
    );
  }

  return <>{children}</>;
}