import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.context.jsx";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    console.log("No global context available");
    return;
  }

  return context;
};
