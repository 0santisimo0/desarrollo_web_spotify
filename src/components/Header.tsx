import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { PageRoutes } from "../utils/pageRoutes";
import { Person } from "@mui/icons-material";

export default function Header() {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate(PageRoutes.LOGIN);
  };

  const getFirstName = (fullName?: string) => {
    if (!fullName) return "Usuario";
    return fullName.split(" ")[0];
  };

  if (loading) {
    return (
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "center" }}>
          <CircularProgress color="inherit" />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to={PageRoutes.HOME} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6">Spotify</Typography>
        </Link>

        <Box>
          {!user ? (
            <>
              <Link to={PageRoutes.LOGIN} style={{ textDecoration: "none" }}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to={PageRoutes.SIGNUP} style={{ textDecoration: "none" }}>
                <Button color="inherit">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Box display="flex" alignItems="center">
              {userProfile?.role === "admin" && (
                <Link to={PageRoutes.ADMIN} style={{ textDecoration: "none" }}>
                  <Button color="inherit">Admin</Button>
                </Link>
              )}

              <Link to={PageRoutes.PROFILE} style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  sx={{ display: "flex", alignItems: "center", textTransform: "none" }}
                >
                  <Person sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span">
                    {getFirstName(userProfile?.name)}
                  </Typography>
                </Button>
              </Link>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
