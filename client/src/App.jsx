import { Routes, Route } from "react-router-dom";

import RegistrationPage from "./modules/authentication/pages/RegistrationPage.pages.jsx";
import SignInPage from "./modules/authentication/pages/SignInPage.pages.jsx";
import Dashboard from "./modules/data/pages/Dashboard.pages.jsx";
import Settings from "./modules/data/pages/Settings.pages.jsx";
import Statistics from "./modules/data/pages/Statistics.pages.jsx";
import TableOfProgress from "./modules/data/pages/TableOfProgress.pages.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/table" element={<TableOfProgress />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
};

export default App;
