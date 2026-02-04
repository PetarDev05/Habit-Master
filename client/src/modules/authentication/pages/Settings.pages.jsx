import { useUserContext } from "../hooks/useUserContext.hooks.jsx";

const Settings = () => {
  const { signOutUser, deleteUser } = useUserContext();

  return (
    <div>
      <h1>Settings</h1>
      <div className="flex flex-row items-center gap-5 p-5">
        <button onClick={signOutUser} className="px-5 py-1 bg-gray-200 border">
          Sign out
        </button>
        <button onClick={deleteUser} className="px-5 py-1 bg-gray-200 border">
          Delete account
        </button>
      </div>
    </div>
  );
};

export default Settings;
