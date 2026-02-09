import { useState } from "react";
import { GlobalContext } from "./GlobalContext.context.jsx";

const GlobalContextProvider = ({ children }) => {
  const [showPanel, setShowPanel] = useState(false);

  const value = {
    showPanel,
    setShowPanel,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
