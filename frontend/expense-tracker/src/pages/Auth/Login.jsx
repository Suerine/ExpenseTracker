import React, { useContext, useState} from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

 
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    // Login API call
    try{
     const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email, 
      password
     });
     const { token, user } = response.data;

     if (token) {
      localStorage.setItem("token", token);
      updateUser(user); 
      navigate("/dashboard");
     }
    } catch (err) {
     if (err.response && err.response.data.message) {
      setError(err.response.data.message);
     } else {
      setError("An unexpexted error occured. Please try again later.");
     }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1.5 mb-6">
          Please enter your credentials to access your account.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={setEmail}
            label="Email Address"
            placeholder="timcook@gmail.com"
            type="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={setPassword}
          />

          {error && (
            <p className="text-red-500 text-xs mt-2">{error}</p>
          )}

          <button type="submit" className="btn-primary mt-4">
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
