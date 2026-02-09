import { useState } from "react";
import { useGlobalContext } from "../../../../hooks/useGlobalContext.hooks.jsx";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Panel = ({ createNewWeek, isLoadingData }) => {
  const { showPanel, setShowPanel } = useGlobalContext();
  const [skipButton, setSkipButton] = useState([0, 0, 0, 0, 0, 0, 0]);

  const [date, setDate] = useState("");
  const [newHabits, setNewHabits] = useState([]);
  const [habitInput, setHabitInput] = useState("");
  const [skipped, setSkipped] = useState([]);

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
    let mockArray = [...skipButton];
    mockArray[Number(value)] = 1;
    setSkipButton(mockArray);
  };

  const handleAddHabit = () => {
    if (!habitInput) {
      return;
    }
    setNewHabits([...newHabits, { title: habitInput, skippedDays: skipped }]);
    setHabitInput("");
    setSkipped([]);
    setSkipButton([0, 0, 0, 0, 0, 0, 0]);
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

  return (
    <div>
      {showPanel && (
        <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full max-w-120 bg-(--white) rounded-xl shadow-[0px_0px_3px_1px_var(--shadow-light)] p-8 flex flex-col items-center gap-10">
          <div className="w-full flex justify-between items-center">
            <p className="text-xl font-semibold">Create new habit</p>
            <span
              onClick={() => {
                setShowPanel(false);
              }}
              className="text-3xl text-(--red) p-2 cursor-pointer"
            >
              <IoIosCloseCircleOutline />
            </span>
          </div>
          <div className="w-full flex flex-row items-center gap-5">
            <p className="flex-1 text-(--text-light)">Chose starting date: </p>
            <input
              onChange={handleDateChange}
              type="date"
              value={date}
              className="flex-1 py-2 px-3 border border-(--border-light) rounded-md focus:border-(--primary) outline-none"
            />
          </div>
          <div className="w-full flex flex-row items-center gap-5">
            <input
              type="text"
              className="flex-4 py-2 px-3 border border-(--border-light) rounded-md focus:border-(--primary) outline-none"
              value={habitInput}
              onChange={handleHabitInputChange}
              placeholder="Habit name"
            />
            <button
              onClick={handleAddHabit}
              className="px-5 py-2 rounded-md bg-(--primary) text-(--white) cursor-pointer"
            >
              Add
            </button>
          </div>

          <div className="w-full flex flex-row items-center justify-between gap-2">
            <p className="text-(--text-light)">Chose days to skip: </p>
            <div className="flex flex-row items-center gap-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <button
                  key={i}
                  onClick={handleSkipped}
                  value={i}
                  className={`w-5 h-5 cursor-pointer border-2 rounded-full ${skipButton[i] === 1 ? "bg-(--primary)" : "bg-(--white)"}`}
                ></button>
              ))}
            </div>
          </div>

          <button
            disabled={isLoadingData}
            onClick={sendData}
            className="w-full py-2 rounded-md bg-(--primary) text-(--white) cursor-pointer"
          >
            Create week
          </button>
        </div>
      )}
    </div>
  );
};

export default Panel;
