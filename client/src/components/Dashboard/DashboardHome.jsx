import React from "react";
import { useEffect } from "react";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  getAllUsers,
} from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/stateProvider";

import { FaUser } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400">
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          ...data,
          Users: data.data,
        });
        console.log("DATA.DATA : ", data.data);
        console.log("ALL USERS : ", Users);
        console.log("LENGTH : ", allUsers?.length);
      });
    }
  }, []);
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUser className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length}
      />
    </div>
  );
};

export default DashboardHome;
