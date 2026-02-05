import { useContext } from "react";
import { UserContext } from "../context/UserContext.context.jsx";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    console.log("No user context available");
    return;
  }

  return context;
};
