import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState(""); // Update state variable
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();

    const response = await fetch(
      "https://notes-backend-c5i7.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();
    // alert(data.message);

    if (data.message === "User registered successfully") {
      alert(data.message + ". Login to continue");
      navigate("/login");
    } else {
      alert(data.message + "Retry or signup later.");
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={registerUser}>
      <div className="">
        <div className="my-5">
          <label htmlFor="username" className="sr-only">
            Username {/* Update label */}
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="username"
            name="username"
            type="text"
            required={true}
            autoComplete="username"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Username"
          />
        </div>

        <div className="my-5">
          <label htmlFor="password" className="sr-only">
            "Password"
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            autoComplete="password"
            type="password"
            required={true}
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10 "
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
