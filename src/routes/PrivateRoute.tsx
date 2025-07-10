import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { PageRoutes } from "../utils/pageRoutes";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) return <Navigate to={PageRoutes.LOGIN} replace />;
  return <>{children}</>;
}
