import React, { useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import { Home, Profile, Onboarding } from "./pages";
import MedicalRecord from "./pages/records/index";

import { useStateContext } from "./context";
import { usePrivy } from "@privy-io/react-auth";
import SingleRecordDetails from "./pages/records/single-record";

const App = () => {
  const navigate = useNavigate();
  const { currentUser } = useStateContext();

  const { user, authenticated, ready, login } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    } else if (user && !currentUser) {
      navigate("/onboarding");
    }
  }, [ready, currentUser, navigate]);

  return (
    <div className="relative flex min-h-screen flex-row bg-[#13131a]">
      <div className="relative mr-10 hidden sm:flex">
        {/* sidebar */}
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        {/* Navbar */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/medical-records" element={<MedicalRecord />} />
          <Route
            path="/medical-records/:id"
            element={<SingleRecordDetails />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
