import { useDataContext } from "../hooks/useDataContext.hooks.jsx";

const TableOfProgress = () => {
  const {
    state: { checkIns, habits, activeWeek },
  } = useDataContext();

  const activeHabits = habits?.filter(
    (habit) => habit?.weekId === activeWeek?._id,
  );

  const activeCheckIns = checkIns?.filter(
    (checkIn) => checkIn?.weekId === activeWeek?._id,
  );

  return (
    <div className="w-full min-h-screen pt-19">
      <div className="w-full max-w-150 bg-(--white) shadow-[0px_0px_3px_var(--shadow-light)] rounded-xl fixed top-1/2 left-1/2 -translate-1/2 p-12 flex flex-col items-start gap-10">
        <h2 className="text-2xl font-semibold">Table of weekly progress</h2>
        <div className="w-full flex flex-row items-start gap-10 ">
          <div className="flex-1 flex flex-col items-start gap-5 overflow-hidden">
            {activeHabits?.map((habit) => (
              <p key={habit._id} className="text-xl text-(--text-light)">
                {habit.title}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-5">
            {activeCheckIns?.map((checkIn) => (
              <div
                key={checkIn._id}
                className={`w-7 h-7 rounded shadow-checkIn ${checkIn.status === "done" ? "bg-(--done)" : checkIn.status === "missed" ? "bg-(--missed)" : checkIn.status === "skipped" ? "bg-(--skipped)" : "bg-(super-light-white)"}`}
              ></div>
            ))}
          </div>
        </div>
        {!activeHabits.length && (
          <p className="text-(--text-light)">No active habits</p>
        )}
      </div>
    </div>
  );
};

export default TableOfProgress;
