import { useState } from "react";
import { useDataContext } from "../hooks/useDataContext.hooks.jsx";
import { comapreDates } from "../utils/compareDates.utils.js";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const {
    state: { habits, checkIns, activeWeek },
    isLoadingData,
    changeCheckInStatus,
    deleteWeek,
    createNewWeek,
  } = useDataContext();
  let activeHabits = habits?.filter((habit) => habit.weekId === activeWeek._id);
  const [showPanel, setShowPanel] = useState(false);

  const [date, setDate] = useState("");
  const [newHabits, setNewHabits] = useState([]);
  const [habitInput, setHabitInput] = useState("");
  const [skipped, setSkipped] = useState([]);

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
    toast(deleteConfirmation.message);
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setDate(value);
  };

  const handleHabitInputChange = (e) => {
    const { value } = e.target;
    setHabitInput(value);
  };

  const handleSkipped = (e) => {
    if (skipped.length >= 3) {
      return;
    }
    const { value } = e.target;

    const isInSkipped = skipped.find((index) => index === Number(value));
    if (isInSkipped) {
      return;
    }
    setSkipped([...skipped, Number(value)]);
  };

  const handleAddHabit = () => {
    if (!habitInput) {
      return;
    }
    setNewHabits([...newHabits, { title: habitInput, skippedDays: skipped }]);
    setHabitInput("");
    setSkipped([]);
  };

  const sendData = async () => {
    const newWeekData = {
      userDateString: date,
      habits: newHabits,
    };

    const newData = await createNewWeek(newWeekData);
    toast(newData.message);
    setShowPanel(false);
    setDate("");
    setNewHabits([]);
  };

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
        {!activeWeek && (
          <button
            onClick={() => {
              setShowPanel(true);
            }}
            className="border bg-gray-200 px-5 py-1"
          >
            Create new week
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

      {showPanel && (
        <div className="ml-10 w-full max-w-150 border p-10 flex flex-col items-center gap-10">
          <div className="w-full text-right">
            <span
              onClick={() => {
                setShowPanel(false);
              }}
              className="text-xl font-semibold border px-4 py-1 cursor-pointer"
            >
              X
            </span>
          </div>
          <div className="">
            <p className="">Chose starting date: </p>
            <input
              onChange={handleDateChange}
              type="date"
              value={date}
              className="border px-4 py-1"
            />
          </div>
          <div className="w-full flex flex-row items-center gap-5">
            <input
              type="text"
              className="border flex-3 px-5 py-1"
              value={habitInput}
              onChange={handleHabitInputChange}
              placeholder="Habit name"
            />
            <button
              onClick={handleAddHabit}
              className="flex-1 border bg-gray-200 px-5 py-1"
            >
              Add
            </button>
          </div>

          <div className="flex flex-row items-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <button
                key={i}
                onClick={handleSkipped}
                value={i}
                className="border w-4 h-4 rounded"
              ></button>
            ))}
          </div>

          <button
            disabled={isLoadingData}
            onClick={sendData}
            className="w-full py-1 bg-gray-200 border"
          >
            Create week
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
