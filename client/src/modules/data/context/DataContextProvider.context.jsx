import { useEffect, useReducer, useState } from "react";
import { DataContext } from "./DataContext.context.jsx";
import { fetchAllData } from "../api/fetchData.api.js";
import { createWeek } from "../api/createNewWeek.api.js";
import { checkIn } from "../api/checkIn.api.js";
import { deleteWeekData } from "../api/deleteWeekData.api.js";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_DATA":
      return {
        ...state,
        weeks: payload.weeks,
        habits: payload.habits,
        checkIns: payload.checkIns,
        activeWeek: payload.weeks.find((week) => week.status === "active"),
      };
    case "CREATE_NEW_WEEK":
      return {
        ...state,
        weeks: [payload.newWeek, ...state.weeks],
        habits: [...payload.newHabits, ...state.habits],
        checkIns: [...payload.newCheckIns, ...state.checkIns],
        activeWeek: payload.newWeek,
      };
    case "CHECK-IN":
      return {
        ...state,
        checkIns: state.checkIns.map((checkIn) =>
          checkIn._id === payload.updatedCheckIn._id
            ? payload.updatedCheckIn
            : checkIn,
        ),
        activeWeek: payload.updatedWeekId
          ? (state.activeWeek.status = "completed")
          : state.activeWeek,
      };
    case "DELETE_WEEK":
      return {
        weeks: state.weeks.filter((week) => {
          week._id === state.activeWeek._id;
        }),
        habits: state.habits.filter((habit) => {
          habit.weekId === state.activeWeek._id;
        }),
        checkIns: state.checkIns.filter((checkIn) => {
          checkIn.weekId === state.activeWeek._id;
        }),
        activeWeek: null,
      };
    default:
      return state;
  }
};

const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    weeks: null,
    habits: null,
    checkIns: null,
    activeWeek: null,
  });
  const [isLoadingData, setIsLoadingData] = useState(false);

  const createNewWeek = async (newWeekData) => {
    setIsLoadingData(true);
    const newWeek = await createWeek(newWeekData);

    if (!newWeek.success) {
      setIsLoadingData(false);
      return newWeek;
    }

    dispatch({ type: "CREATE_NEW_WEEK", payload: newWeek.data });
    setIsLoadingData(false);
    return newWeek;
  };

  const changeCheckInStatus = async (checkInId) => {
    setIsLoadingData(true);
    const updatedData = await checkIn(checkInId);

    if (!updatedData.success) {
      setIsLoadingData(false);
      return updatedData;
    }

    dispatch({ type: "CHECK-IN", payload: updatedData.data });
    setIsLoadingData(false);
    return updatedData;
  };

  const deleteWeek = async (weekId) => {
    setIsLoadingData(true);
    const deleteConfirmation = await deleteWeekData(weekId);

    if (!deleteConfirmation.success) {
      setIsLoadingData(false);
      return deleteConfirmation;
    }

    dispatch({ type: "DELETE_WEEK", payload: deleteConfirmation.data });
    setIsLoadingData(false);
    return deleteConfirmation;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);

      const fetchedData = await fetchAllData();

      if (!fetchedData.success) {
        setIsLoadingData(false);
        return fetchedData;
      }

      dispatch({ type: "FETCH_DATA", payload: fetchedData.data });
      setIsLoadingData(false);
      return fetchedData;
    };

    window.addEventListener("user:session-extended", fetchData);

    return () => {
      window.removeEventListener("user:session-extended", fetchData);
    };
  }, []);

  const value = {
    state,
    dispatch,
    isLoadingData,
    createNewWeek,
    changeCheckInStatus,
    deleteWeek,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
