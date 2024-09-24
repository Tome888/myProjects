import { Navigate } from "react-router-dom";
interface Prop{
    user: any,
    children: React.ReactElement;
}
export const ProtectedRoute = ({ user, children }: Prop) => {
    if (!user) {
      return <Navigate to="/signIn" replace />;
    }
    return children;
  };