import { useEffect, useReducer, useState } from "react";
import { UserContext } from "./UserContext.context.jsx";
import { extendSession } from "../../../helpers/extendSession.helpers.js";
import {
  clearAccessToken,
  setAccessToken,
} from "../../../utils/tokenStore.utils.js";
import { createAccount } from "../api/createAccount.api.js";
import { signIn } from "../api/signIn.api.js";
import { signOut } from "../api/signOut.api.js";
import { deleteAccount } from "../api/deleteAccount.api.js";

const URL_BASE = import.meta.env.VITE_API_URL_BASE;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "REGISTRATION":
      return {
        ...state,
        user: payload.newUser,
        isAuthenticated: true,
      };
    case "SIGN_IN":
      return {
        ...state,
        user: payload.existingUser,
        isAuthenticated: true,
      };
    case "SIGN_OUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isAuthenticated: false,
  });

  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const registerUser = async (registrationData) => {
    setIsLoadingUser(true);
    const newUserData = await createAccount(registrationData);

    if (!newUserData.success) {
      setIsLoadingUser(false);
      return newUserData;
    }

    dispatch({ type: "REGISTRATION", payload: newUserData.data });
    setAccessToken(newUserData.data.accessToken);
    window.dispatchEvent(new Event("user:session-extended"));
    setIsLoadingUser(false);
    return newUserData;
  };

  const signInUser = async (signInData) => {
    setIsLoadingUser(true);
    const userData = await signIn(signInData);

    if (!userData.success) {
      setIsLoadingUser(false);
      return userData;
    }

    dispatch({ type: "SIGN_IN", payload: userData.data });
    setAccessToken(userData.data.accessToken);
    window.dispatchEvent(new Event("user:session-extended"));
    setIsLoadingUser(false);
    return userData;
  };

  const signOutUser = async () => {
    const signOutConfirmation = await signOut(state.user._id);
    dispatch({ type: "SIGN_OUT" });
    window.dispatchEvent(new Event("user:clear-data"));
    clearAccessToken();
    return signOutConfirmation;
  };

  const deleteUser = async () => {
    const deleteConfirmation = await deleteAccount();

    if (!deleteConfirmation.success) {
      clearAccessToken();
      return deleteConfirmation;
    }

    dispatch({ type: "SIGN_OUT" });
    window.dispatchEvent(new Event("user:clear-data"));
    clearAccessToken();
    return deleteConfirmation;
  };

  useEffect(() => {
    const handler = () => {
      dispatch({ type: "SIGN_OUT" });
      clearAccessToken();
    };

    window.addEventListener("user:sign-out", handler);

    return () => {
      window.removeEventListener("user:sign-out", handler);
    };
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      setIsLoadingUser(true);
      const extendResult = await extendSession(URL_BASE);

      if (!extendResult.success) {
        setIsLoadingUser(false);
        return;
      }

      setAccessToken(extendResult.accessToken);
      dispatch({ type: "SIGN_IN", payload: extendResult });
      setIsLoadingUser(false);
      window.dispatchEvent(new Event("user:session-extended"));
    };

    restoreSession();
  }, []);

  const value = {
    state,
    dispatch,
    isLoadingUser,
    registerUser,
    signInUser,
    signOutUser,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
