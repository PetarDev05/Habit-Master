import { useUserContext } from "../hooks/useUserContext.hooks.jsx";

const SettingsPanel = () => {
  const { signOutUser, deleteUser } = useUserContext();

  return (
    <div className="w-full max-w-150 py-5 px-10 flex flex-col items-center gap-5 rounded-xl bg-(--white)">
      <h2 className="w-full text-2xl font-semibold text-(--primary)">
        Settings
      </h2>

      <hr className="w-full text-(--separator)" />

      <div className="w-full flex flex-col items-start">
        <h3 className="text-xl w-full">Account</h3>
        <div className="py-6 flex flex-row items-center gap-5">
          <button
            onClick={signOutUser}
            className="px-5 py-2 rounded-lg bg-(--primary) text-(--white)"
          >
            Sign out
          </button>
          <button
            onClick={deleteUser}
            className="px-5 py-2 rounded-lg bg-(--red) text-(--white)"
          >
            Delete account
          </button>
        </div>
      </div>

      <hr className="w-full text-(--separator)" />

      <div className="w-full flex flex-col items-start">
        <h3 className="text-xl w-full">Preferences</h3>
        <p className="text-md text-(--text-light)">Theme</p>
        <div className="py-6 flex flex-row items-center gap-5">
          <div className="w-25 h-25 rounded-lg border-2 border-(--tog-border) relative bg-(--tog-bg-light) cursor-pointer">
            <div className="absolute top-1/5 w-2/3 h-7 rounded-tr-lg rounded-br-lg bg-(--white)"></div>
            <div className="absolute top-3/5 left-1/4 w-1/2 h-7 rounded-lg bg-(--white)"></div>
          </div>
          <div className="w-25 h-25 rounded-lg border-2 border-(--tog-border) relative bg-(--tog-bg-dark) cursor-pointer">
            <div className="absolute top-1/5 w-2/3 h-7 rounded-tr-lg rounded-br-lg bg-(--tog-card-dark)"></div>
            <div className="absolute top-3/5 left-1/4 w-1/2 h-7 rounded-lg bg-(--tog-card-dark)"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
