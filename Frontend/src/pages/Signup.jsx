import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthDataContext } from "../../Context/AuthContext";

const Signup = () => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  const {AuthUser, setAuthUser} = useContext(AuthDataContext)
  const HandleSubmit = (e) => {
    e.preventDefault();
    const Data = {
      FullName,
      Email,
      Password,
      ConfirmPassword,
    };

    axios.post(`${import.meta.env.VITE_URI}/user/signup`, Data, {withCredentials: true})
      .then((response) => {
        localStorage.setItem("ToDoUser", response.data.newUser.Email)
        setAuthUser(localStorage.getItem("ToDoUser"))
        navigate("/todo")
      });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <form
        className="h-auto w-full max-w-md p-6 bg-white shadow-lg rounded-md"
        onSubmit={HandleSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your full name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Submit
          </button>

          <p>Already have account?<Link to={"/login"}> click here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
