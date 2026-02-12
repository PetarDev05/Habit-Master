import { HiOutlineCheckCircle } from "react-icons/hi";

const HabitCard = ({ habit, checkIns, checkInUser }) => {
  const indicators = checkIns.filter(
    (checkIn) => checkIn.habitId === habit._id,
  );

  return (
    <div
      key={habit._id}
      className="w-full rounded-lg shadow-[0px_0px_5px_1px_var(--shadow-light)] bg-(--white) flex flex-row items-center justify-between px-7 py-6"
    >
      <p className="flex-2 text-xl font-semibold">{habit.title}</p>

      <div className="flex flex-row items-center gap-3">
        {indicators.map((indicator) => (
          <div
            key={indicator._id}
            className={`w-3 h-3 rounded-sm border-2 ${indicator.status === "missed" || indicator.status === "done" || indicator.status === "skipped" ? "bg-(--primary)" : ""}`}
          ></div>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-end">
        <button
          onClick={() => checkInUser(habit._id)}
          className={`bg-(--primary) text-2xl p-1  text-(--white) rounded-full text-md cursor-pointer`}
        >
          <HiOutlineCheckCircle />
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
