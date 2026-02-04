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
      className="w-70 flex flex-col items-center gap-5"
    >
      <input
        type="text"
        className="border w-full px-2 py-1"
        name="username"
        onChange={handleChange}
        value={formData.username}
        placeholder="Username"
      />
      <input
        type="text"
        className="border w-full px-2 py-1"
        name="email"
        onChange={handleChange}
        value={formData.email}
        placeholder="Email"
      />
      <input
        type="text"
        className="border w-full px-2 py-1"
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Password"
      />
      <button type="submit" className="w-full bg-gray-200 py-1 border">
        Register
      </button>
      <p className="">
        Have an account?
        <Link className="text-blue-700" to="/sign-in">
          {" "}
          Sign in here
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
