import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RegistrationPage from "./modules/authentication/pages/RegistrationPage.pages.jsx";
import SignInPage from "./modules/authentication/pages/SignInPage.pages.jsx";
import Dashboard from "./modules/data/pages/Dashboard.pages.jsx";
import Settings from "./modules/data/pages/Settings.pages.jsx";
import Statistics from "./modules/data/pages/Statistics.pages.jsx";
import TableOfProgress from "./modules/data/pages/TableOfProgress.pages.jsx";

import { useUserContext } from "./modules/authentication/hooks/useUserContext.hooks.jsx";

const App = () => {
  const { user } = useUserContext();

  return (
    <div>
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
          element={user ? <Dashboard /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/register"
          element={user ? <Dashboard /> : <Navigate to="/register" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
