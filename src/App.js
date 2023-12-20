import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home/:id" element={<HomePageWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

// Create a wrapper component to pass useParams to HomePage
const HomePageWrapper = () => {
  const params = useParams();
  return <HomePage googleId={params.id} />;
};

export default App;
