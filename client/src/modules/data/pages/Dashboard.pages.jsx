import { useEffect, useState } from "react";
import { useDataContext } from "../hooks/useDataContext.hooks.jsx";
import { comapreDates } from "../utils/compareDates.utils.js";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const {
    state: { habits, checkIns, activeWeek },
    isLoadingData,
    changeCheckInStatus,
    deleteWeek,
  } = useDataContext();
  const [activeHabits, setActiveHabits] = useState([]);

  const checkInUser = async (event) => {
    const today = new Date();
    const { value } = event.target;
    const todayCheckIn = checkIns.find(
      (checkIn) =>
        checkIn.habitId === value && comapreDates(today, checkIn.dueDate),
    );

    const updatedData = await changeCheckInStatus(todayCheckIn._id);
    toast(updatedData.message);
  };

  const deleteWeekData = async () => {
    const deleteConfirmation = await deleteWeek(activeWeek._id);
    setActiveHabits([]);
    toast(deleteConfirmation.message);
  };

  useEffect(() => {
    const fillHabitsArray = () => {
      if (!activeWeek) {
        return;
      }
      const habs = habits?.filter((habit) => habit.weekId === activeWeek._id);
      setActiveHabits(habs);
    };

    fillHabitsArray();
  }, [habits, activeWeek]);

  if (isLoadingData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="">Dashboard</h1>

      <div className="w-full max-w-150 flex flex-col items-center gap-5 p-5">
        {activeWeek && (
          <button
            onClick={deleteWeekData}
            className="border bg-gray-200 px-5 py-1"
          >
            Delete week
          </button>
        )}
        {activeHabits?.map((habit) => (
          <div
            key={habit._id}
            className="w-full  border bg-gray-200 p-3 flex flex-row items-center justify-between"
          >
            <div className="">
              <p className="">{habit.title}</p>
              <p className="">{habit.createdAt}</p>
            </div>
            <button
              value={habit._id}
              onClick={checkInUser}
              className="bg-white px-4 py-1"
            >
              Check in
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
