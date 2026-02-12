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

    if (updatedData.success) {
      toast.success(updatedData.message);
    } else {
      toast.error(updatedData.message);
    }
  };

  const deleteWeekData = async () => {
    const deleteConfirmation = await deleteWeek(activeWeek._id);
    if (deleteConfirmation.success) {
      toast.success(deleteConfirmation.message);
    } else {
      toast.error(deleteConfirmation.message);
    }
  };

  return (
    <div className="w-full pt-19 pb-20 flex justify-center">
      <div className="w-full max-w-150 flex flex-col items-center gap-5 p-5">
        <Controls deleteWeekData={deleteWeekData} />
        <HabitContainer checkInUser={checkInUser} isLoadingData={isLoadingData} />
      </div>
      <Panel createNewWeek={createNewWeek} isLoadingData={isLoadingData} />
    </div>
  );
};

export default Dashboard;
