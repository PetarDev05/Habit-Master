import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext.hooks.jsx";
import { useState } from "react";
import { toast } from "react-hot-toast";

const RegistrationForm = () => {
  const { registerUser } = useUserContext();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await registerUser(formData);
    if (newUser.success) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }

    toast(newUser.message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-100 flex flex-col items-center gap-7 shadow-[0px_0px_7px_1px_var(--shadow-light)] p-10 rounded-xl "
    >
      <h2 className="text-3xl font-semibold text-(--primary)">Habit Master</h2>
      <p className="w-full text-md text-(--primary) text-center">Register here</p>
      <input
        type="text"
        className="w-full py-2 px-3 border border-(--border-light) rounded-md focus:border-(--primary) outline-none"
        name="username"
        onChange={handleChange}
        value={formData.username}
        placeholder="Username"
      />
      <input
        type="text"
        className="w-full py-2 px-3 border border-(--border-light) rounded-md focus:border-(--primary) outline-none"
        name="email"
        onChange={handleChange}
        value={formData.email}
        placeholder="Email"
      />
      <input
        type="text"
        className="w-full py-2 px-3 border border-(--border-light) rounded-md focus:border-(--primary) outline-none"
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Password"
      />
      <div className="w-full flex flex-col items-center gap-3">
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-(--primary) text-(--white) cursor-pointer"
        >
          Register
        </button>
        <p className="text-(--text)">
          Have an account?
          <Link className="text-(--primary)" to="/sign-in">
            {" "}
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;
