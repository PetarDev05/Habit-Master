import { DataContext } from "../context/DataContext.context.jsx";
import { useContext } from "react";

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    console.log("No data context available");
    return;
  }

  return context;
};
