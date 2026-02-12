import { useDataContext } from "../hooks/useDataContext.hooks.jsx";
import { comapreDates } from "../utils/compareDates.utils.js";
import { toast } from "react-hot-toast";
import Controls from "../components/dashboard/Controls.components.jsx";
import HabitContainer from "../components/dashboard/HabitContainer.components.jsx";
import Panel from "../components/dashboard/Panel.components.jsx";

const Dashboard = () => {
  const {
    state: { checkIns, activeWeek },
    isLoadingData,
    changeCheckInStatus,
    deleteWeek,
    createNewWeek,
  } = useDataContext();

  const checkInUser = async (habitId) => {
    const today = new Date();
    const todayCheckIn = checkIns.find(
      (checkIn) =>
        checkIn.habitId === habitId && comapreDates(today, checkIn.dueDate),
    );

    const updatedData = await changeCheckInStatus(todayCheckIn._id);
    toast(updatedData.message);
  };

  const deleteWeekData = async () => {
    const deleteConfirmation = await deleteWeek(activeWeek._id);
    toast(deleteConfirmation.message);
  };

  if (isLoadingData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-19 flex justify-center">
      <div className="w-full max-w-150 flex flex-col items-center gap-5 p-5">
        <Controls deleteWeekData={deleteWeekData} />
        <HabitContainer checkInUser={checkInUser} />
      </div>
      <Panel createNewWeek={createNewWeek} isLoadingData={isLoadingData} />
    </div>
  );
};

export default Dashboard;
