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
import Header from "./components/Header.components.jsx";
import LoadingScreen from "./components/LoadingScreen.components.jsx";

const App = () => {
  const {
    state: { user },
    isLoadingUser,
  } = useUserContext();

  if (isLoadingUser) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full min-h-screen">
      {user && <Navigation />}
      {user && <Header />}
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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#16a34a",
              color: "#ffffff",
            },
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#ffffff",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
