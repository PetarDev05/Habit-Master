import { useUserContext } from "../modules/authentication/hooks/useUserContext.hooks.jsx";

const Header = () => {
  const {
    state: { user },
  } = useUserContext();

  return (
    <header className="w-full flex flex-row items-center justify-between fixed top-0 left-0 right-0 p-5  shadow text-(--primary) bg-(--white) z-50">
      <p className="text-2xl font-semibold">Habit Master</p>
      <p className="text-lg text-(--text-light)">Welcome, {user.username}</p>
    </header>
  );
};

export default Header;
