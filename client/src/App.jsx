import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RegistrationPage from "./modules/authentication/pages/RegistrationPage.pages.jsx";
import SignInPage from "./modules/authentication/pages/SignInPage.pages.jsx";
import Dashboard from "./modules/data/pages/Dashboard.pages.jsx";
import Settings from "./modules/authentication/pages/Settings.pages.jsx";
import Statistics from "./modules/data/pages/Statistics.pages.jsx";
import TableOfProgress from "./modules/data/pages/TableOfProgress.pages.jsx";

import Navigation from "./components/Navigation.components.jsx";

import { useUserContext } from "./modules/authentication/hooks/useUserContext.hooks.jsx";

const App = () => {
  const {
    state: { user },
    isLoadingUser,
  } = useUserContext();

  if (isLoadingUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-2xl font-semibold">
        LOADING...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      {user && <Navigation />}
      <Routes>
        <Route
          index
          element={user ? <Dashboard /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/table"
          element={user ? <TableOfProgress /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/statistics"
          element={user ? <Statistics /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/sign-in"
          element={!user ? <SignInPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <RegistrationPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
