import { useDataContext } from "../../hooks/useDataContext.hooks.jsx";
import HabitCard from "./HabitCard.components.jsx";

const HabitContainer = ({ checkInUser }) => {
  const {
    state: { habits, activeWeek },
  } = useDataContext();

  let activeHabits = habits?.filter((habit) => habit.weekId === activeWeek._id);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {activeHabits?.map((habit) => (
        <HabitCard key={habit._id} habit={habit} checkInUser={checkInUser} />
      ))}
    </div>
  );
};

export default HabitContainer;
