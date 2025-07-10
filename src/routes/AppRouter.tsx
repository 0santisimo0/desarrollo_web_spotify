import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import { PageRoutes } from "../utils/pageRoutes";
import Header from "../components/Header";
import Home from "../pages/Home";
import AdminPage from "../pages/Admin";
import GenrePage from "../pages/Genre";
import ArtistPage from "../pages/Artist";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path={PageRoutes.HOME} element={<Home />} />
        <Route path={PageRoutes.LOGIN} element={<Login />} />
        <Route path={PageRoutes.SIGNUP} element={<Signup />} />
        <Route path={PageRoutes.GENRE + "/:genreId"} element={<GenrePage />} />
        <Route path={PageRoutes.ARTIST + "/:artistId"} element={<ArtistPage />} />

        <Route
          path={PageRoutes.PROFILE + "/:uid"}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PageRoutes.PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PageRoutes.ADMIN}
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
