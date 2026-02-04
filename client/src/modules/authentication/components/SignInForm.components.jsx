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

    toast(existingUser.message);
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
        onChange={handleChange}
        name="username"
        value={formData.username}
        type="text"
        className="border w-full px-2 py-1"
        placeholder="Username"
      />
      <input
        onChange={handleChange}
        name="password"
        value={formData.password}
        type="text"
        className="border w-full px-2 py-1"
        placeholder="Password"
      />
      <button className="w-full bg-gray-200 py-1 border">Sign in</button>
      <p className="">
        Don't have an account?
        <Link className="text-blue-700" to="/register">
          {" "}
          Register here
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
