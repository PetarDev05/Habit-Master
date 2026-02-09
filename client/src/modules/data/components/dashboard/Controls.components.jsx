import { useDataContext } from "../../hooks/useDataContext.hooks.jsx";
import { useGlobalContext } from "../../../../hooks/useGlobalContext.hooks.jsx";
import { IoIosAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

const Controls = ({ deleteWeekData }) => {
  const {
    state: { activeWeek },
  } = useDataContext();
  const { setShowPanel } = useGlobalContext();

  const weekStartDate = new Date(activeWeek?.createdAt);
  const weekEndDate = new Date(activeWeek?.endDate);

  const startYear = weekStartDate?.getFullYear();
  const startMonth = weekStartDate?.getMonth();
  const startDay = weekStartDate?.getDate();

  const endYear = weekEndDate?.getFullYear();
  const endMonth = weekEndDate?.getMonth();
  const endDay = weekEndDate?.getDate();

  return (
    <div className="w-full flex flex-row items-center justify-between px-5 border-b border-(--separator) pb-4">
      {activeWeek && (
        <p className="text-xl text-(--primary) font-semibold">
          {startDay}.{startMonth + 1}.{startYear} - {endDay}.{endMonth + 1}.
          {endYear}
        </p>
      )}
      {activeWeek && (
        <button
          onClick={deleteWeekData}
          className="flex flex-row items-center bg-(--primary) rounded-full text-(--white) cursor-pointer p-3 text-xl"
        >
          <FaTrashAlt />
        </button>
      )}
      {!activeWeek && (
        <p className="text-xl text-(--primary) font-semibold">No active week</p>
      )}
      {!activeWeek && (
        <button
          onClick={() => {
            setShowPanel(true);
          }}
          className="flex flex-row items-center bg-(--primary) rounded-lg text-(--white) cursor-pointer px-5 py-2"
        >
          <IoIosAdd className="text-3xl" />
          Create new week
        </button>
      )}
    </div>
  );
};

export default Controls;
