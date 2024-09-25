import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userData, token, setUserData, setToken } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (!userData || !token) {
      router.push("/signLogIn");
    }
  }, [userData, token, router]);

  if (!userData || !token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
