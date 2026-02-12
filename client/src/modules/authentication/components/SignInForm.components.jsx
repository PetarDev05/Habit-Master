import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext.hooks";
import { toast } from "react-hot-toast";

const SignInForm = () => {
  const { signInUser } = useUserContext();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingUser = await signInUser(formData);
    if (existingUser.success) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }

    if (existingUser.success) {
      toast.success(existingUser.message);
    } else {
      toast.error(existingUser.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-100 flex flex-col items-center bg-(--white)/60 backdrop-blur-2xl gap-7 shadow-[0px_0px_7px_1px_var(--shadow-light)] p-10 rounded-xl"
    >
      <h2 className="text-3xl font-semibold text-(--primary)">Habit Master</h2>
      <p className="w-full text-md text-(--primary) text-center">
        Sign in to your account
      </p>
      <input
        onChange={handleChange}
        name="username"
        value={formData.username}
        type="text"
        className="w-full py-2 px-3 border border-(--border-light) rounded-md focus:border-(--primary) outline-none"
        placeholder="Username"
      />
      <input
        onChange={handleChange}
        name="password"
        value={formData.password}
        type="text"
        className="w-full py-2 px-3 border border-(--border-light) rounded-md focus:border-(--primary) outline-none"
        placeholder="Password"
      />
      <div className="w-full flex flex-col items-center gap-3">
        <button className="w-full py-2 rounded-md bg-(--primary) text-(--white) cursor-pointer">
          Sign in
        </button>
        <p className="text-(--text)">
          Don't have an account?
          <Link className="text-(--primary)" to="/register">
            {" "}
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
