import { useState } from "react";
import { useDataContext } from "../../hooks/useDataContext.hooks.jsx";
import { FaPlus } from "react-icons/fa6";

const StatisticCard = () => {
  const {
    state: { activeWeek, habits, checkIns },
  } = useDataContext();

  const weekStartDate = new Date(activeWeek?.createdAt);
  const weekEndDate = new Date(activeWeek?.endDate);

  const startYear = weekStartDate?.getFullYear();
  const startMonth = weekStartDate?.getMonth();
  const startDay = weekStartDate?.getDate();

  const endYear = weekEndDate?.getFullYear();
  const endMonth = weekEndDate?.getMonth();
  const endDay = weekEndDate?.getDate();

  const [open, setOpen] = useState(false);

  const activeCheckIns = checkIns?.filter(
    (checkIn) => checkIn.status === "done",
  );

  const totalCheckIns = checkIns?.filter(
    (checkIn) =>
      checkIn.status === "done" ||
      checkIn.status === "missed" ||
      checkIn.status === "pending",
  );

  const value =
    (Number(activeCheckIns.length) / Number(totalCheckIns.length)) * 100;

  const activeHabits = habits?.filter(
    (habit) => habit.weekId === activeWeek._id,
  );

  return (
    <div className="w-full rounded-lg p-7 shadow-[1px_1px_5px_var(--shadow-light)] flex flex-col items-start bg-(--white) gap-5">
      <div className="w-full flex flex-row items-center justify-between">
        <span
          onClick={() => setOpen((prev) => !prev)}
          className={`text-xl ${open ? "transform rotate-45" : ""} transition-all duration-150 cursor-pointer`}
        >
          <FaPlus />
        </span>
        <p className="text-xl font-semibold">
          {startDay}.{startMonth + 1}.{startYear} - {endDay}.{endMonth + 1}.
          {endYear}
        </p>
      </div>

      {open && (
        <div className="w-full flex flex-row items-center justify-between transition-all duration-200">
          <ul className="flex flex-col items-start gap-3">
            {activeHabits?.map((habit) => (
              <li key={habit._id} className="text-md text-(--text-light)">
                {habit.title}
              </li>
            ))}
          </ul>
          <div
            className="relative w-35 h-35 rounded-full shadow-[1px_1px_5px_var(--shadow-light)]"
            style={{
              background: `conic-gradient(var(--${value <= 20 ? "missed" : value <= 40 ? "yellow" : value <= 60 ? "yellow-light" : value <= 80 ? "done" : "blue"}) ${value}%, var(--white) 0%)`,
            }}
          >
            <div className="absolute w-25 h-25 z-10 shadow-[inset_1px_1px_5px_var(--shadow-light)] rounded-full top-1/2 left-1/2 -translate-1/2 bg-(--white) text-xl font-semibold flex items-center justify-center">
              {value.toFixed(0)}%
            </div>
          </div>
        </div>
      )}

      {open && <p className="text-lg">Weekly heatmap</p>}
      {open && (
        <div className="grid grid-cols-7 gap-1">
          {checkIns.map((checkin) => (
            <div
              key={checkin._id}
              className={`rounded w-5 h-5 ${checkin.status === "done" ? "bg-(--done)" : checkin.status === "missed" ? "bg-(--missed)" : checkin.status === "skipped" ? "bg-(--skipped)" : "bg-(--super-light-white)"} shadow-checkIn`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticCard;
