import { useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";

import { UserContext } from "./UserContext.context.jsx";
import { extendSession } from "../../../helpers/extendSession.helpers.js";
import { setAccessToken } from "../../../utils/tokenStore.utils.js";

const URL_BASE = import.meta.env.VITE_API_URL_BASE;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "REGISTRATION":
      return {
        ...state,
        user: payload.newUser,
        isLoadingUser: false,
        isAuthenticated: true,
      };
    case "SIGN_IN":
      return {
        ...state,
        user: payload.existingUser,
        isLoadingUser: false,
        isAuthenticated: true,
      };
    case "SIGN_OUT_DELETE_USER":
      return {
        ...state,
        user: null,
        isLoadingUser: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const restoreSession = async () => {
  try {
    const accessToken = await extendSession(URL_BASE);
    setAccessToken(accessToken);
  } catch (error) {
    toast(error.message);
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isLoadingUser: false,
    isAuthenticated: false,
  });

  const value = {
    user: state.user,
    isLoadingUser: state.isLoadingUser,
    isAuthenticated: state.isAuthenticated,
    dispatchUser: dispatch,
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
