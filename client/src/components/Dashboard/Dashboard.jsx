import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";

import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";

import DashboardHome from "./DashboardHome";
import DashboardUsers from "./DashboardUsers";
import DashboardSong from "./DashboardSong";
import DashboardArtist from "./DashboardArtist";
import DashboardAlbums from "./DashboardAlbums";
import DashboardNewSong from "./DashboardNewSong";
import Alert from "../AlertMsg/Alert";
import { useStateValue } from "../../context/stateProvider";

const Dashboard = () => {
  const [{ alertType }, dispatch] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        {/* prettier-ignore */}
        <NavLink to={"/dashboard/home"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }><IoHome className="text-2xl text-textColor" /></NavLink>
        {/* prettier-ignore */}
        <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Users </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Songs </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Artist </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Albums </NavLink>
      </div>

      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUsers />} />
          <Route path="/songs" element={<DashboardSong />} />
          <Route path="/artist" element={<DashboardArtist />} />
          <Route path="/albums" element={<DashboardAlbums />} />
          <Route path="/newSong" element={<DashboardNewSong />} />
        </Routes>
      </div>
      {alertType && <Alert type={"success"} />}
    </div>
  );
};

export default Dashboard;
