import React from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {

    if (!props.googleId) {
      localStorage.removeItem("token");
    }else{
      const res = await fetch('/api/logout/', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      console.log(res);
    }
    alert("Logout Successful");
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
