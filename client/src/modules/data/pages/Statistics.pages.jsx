import { useDataContext } from "../hooks/useDataContext.hooks.jsx";
import StatisticCard from "../components/statistics/StatisticCard.components.jsx";

const Statistics = () => {
  const {
    state: { weeks },
  } = useDataContext();

  return (
    <div className="w-full pt-25 flex  justify-center">
      <div className="w-full max-w-110 flex flex-col items-center justify-start gap-5">
        <h2 className="w-full text-2xl font-semibold">Statistics</h2>
        <div className="w-full flex flex-col items-center gap-5 ">
          {weeks?.map((week) => (
            <StatisticCard key={week._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
