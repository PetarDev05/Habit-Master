import { HiOutlineCheckCircle } from "react-icons/hi";

const HabitCard = ({ habit, checkInUser }) => {
  return (
    <div
      key={habit._id}
      className="w-full rounded-lg shadow-[0px_0px_5px_1px_var(--shadow-light)] bg-(--white) flex flex-row items-center justify-between p-7"
    >
      <p className="flex-2 text-xl font-semibold">{habit.title}</p>

      <div className="flex-1 flex items-center justify-end">
        <button
          onClick={() => checkInUser(habit._id)}
          className=" bg-(--primary) text-2xl p-1  text-(--white) rounded-full text-md cursor-pointer"
        >
          <HiOutlineCheckCircle />
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
