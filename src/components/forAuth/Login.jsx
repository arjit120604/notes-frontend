import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState(""); // Update state variable
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch(
      "https://notes-backend-c5i7.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // Update to use the username state
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      navigate("/home");
    } else {
      alert("Please check your username and password");
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={loginUser}>
      <div className="-space-y-px">
        <div className="my-5">
          <label htmlFor="username" className="sr-only">
            Username
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
      </div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
      >
        Login
      </button>
    </form>
  );
}
