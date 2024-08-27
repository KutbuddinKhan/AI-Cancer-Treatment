import React from "react";

import { Route, Routes, useNavigate} from 'react-router-dom'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Onboarding } from "./pages";


const App = () => {
    return (
        <div className="flex relative min-h-screen flex-row bg-[#13131a]">
            <div className="relative mr-10 hidden sm:flex">
                {/* sidebar */}
                <Sidebar />

            </div>

            <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
                {/* Navbar */}
                <Navbar />
                
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/onboarding" element={ <Onboarding /> } />
                </Routes>
            </div>
        </div>
    )
}

export default App;