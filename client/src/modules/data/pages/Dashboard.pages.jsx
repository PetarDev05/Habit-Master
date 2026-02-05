import { useDataContext } from "../hooks/useDataContext.hooks.jsx";

const Dashboard = () => {
  const {
    state: { weeks, habits, checkIns, isLoadingData },
  } = useDataContext();
  console.log("WEEKS: ", weeks);
  console.log("HABITS: ", habits);
  console.log("CHECKINS: ", checkIns);

  if (isLoadingData) {
    return <div className="w-full h-screen flex items-center justify-center">
      <p className="">Loading...</p>
    </div>
  }

  return (
    <div>
      <h1 className="">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
