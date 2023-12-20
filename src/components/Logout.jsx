import React from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogout = async () => {
    if (!props.googleId) {
      localStorage.removeItem("token");
    }
    alert("Logout Successfull");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-[0.9rem] rounded"
    >
      Logout
    </button>
  );
}

export default Logout;
