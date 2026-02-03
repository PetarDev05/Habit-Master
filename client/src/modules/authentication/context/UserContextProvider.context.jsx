import { useEffect, useReducer, useState } from "react";
import { UserContext } from "./UserContext.context.jsx";
import { extendSession } from "../../../helpers/extendSession.helpers.js";
import { setAccessToken } from "../../../utils/tokenStore.utils.js";
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

    if (!newUserData.success && newUserData.actionType === "SIGN_OUT") {
      dispatch({ type: "SIGN_OUT" });
      setIsLoadingUser(false);
      return newUserData.message;
    }

    dispatch({ type: "REGISTRATION", payload: newUserData });
    setIsLoadingUser(false);
    return newUserData.message;
  };

  const signInUser = async (signInData) => {
    setIsLoadingUser(true);
    const userData = await signIn(signInData);

    if (!userData.success && userData.actionType === "SIGN_OUT") {
      dispatch({ type: "SIGN_OUT" });
      setIsLoadingUser(false);
      return userData.message;
    }

    dispatch({ type: "SIGN_IN", payload: userData });
    setIsLoadingUser(false);
    return userData.message;
  };

  const signOutUser = async () => {
    const signOutConfirmation = await signOut();
    dispatch({ type: "SIGN_OUT" });
    return signOutConfirmation;
  };

  const deleteUser = async () => {
    const deleteConfirmation = await deleteAccount();

    if (
      !deleteConfirmation.success &&
      deleteConfirmation.actionType === "SIGN_OUT"
    ) {
      dispatch({ type: "SIGN_OUT" });
      return deleteConfirmation.message;
    }

    dispatch({ type: "SIGN_OUT" });
  };

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    dispatchUser: dispatch,
    isLoadingUser,
    registerUser,
    signInUser,
    signOutUser,
    deleteUser,
  };

  useEffect(() => {
    const restoreSession = async () => {
      setIsLoadingUser(true);
      const extendResult = await extendSession(URL_BASE);

      if (!extendResult.success) {
        setIsLoadingUser(false);
        return;
      }

      setAccessToken(extendResult.accessToken);
      setIsLoadingUser(false);
    };

    restoreSession();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
