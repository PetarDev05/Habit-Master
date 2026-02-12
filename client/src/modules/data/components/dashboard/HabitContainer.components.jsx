import { useDataContext } from "../../hooks/useDataContext.hooks.jsx";
import HabitCard from "./HabitCard.components.jsx";

const HabitContainer = ({ checkInUser, isLoadingData }) => {
  const {
    state: { habits, activeWeek, checkIns },
  } = useDataContext();

  let activeHabits = habits?.filter((habit) => habit.weekId === activeWeek._id);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {activeHabits?.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          checkIns={checkIns}
          checkInUser={checkInUser}
          isLoadingData={isLoadingData}
        />
      ))}
    </div>
  );
};

export default HabitContainer;
