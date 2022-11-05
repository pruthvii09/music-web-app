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
import { bgColors } from "../../utils/styles";

export const DashboardCard = ({ icon, name, count }) => {
  // const bg_Color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: "#FFE2E6" }}
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center"
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allAlbums, artists }, dispatch] =
    useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          ...data,
          allUsers: data.data,
        });
        // console.log("DATA.DATA : ", data.data);
        // console.log("ALL USERS : ", allUsers);
        // console.log("LENGTH : ", allUsers?.length);
      });
    }
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
        console.log(data.song);
      });
    }

    // if (!artists) {
    //   getAllArtist().then((data) => {
    //     dispatch({ type: actionType.SET_ARTISTS, artists: data.artist });
    //   });
    //   console.log(data.artist);
    // }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.album });
      });
    }
  }, [!allUsers, !allAlbums, !allSongs, !artists]);
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUser className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers.length : 0}
      />

      <DashboardCard
        icon={<GiLoveSong className="text-3xl text-textColor" />}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs.length : 0}
      />
      {/* <DashboardCard
        icon={<GiLoveSong className="text-3xl text-textColor" />}
        name={"Songs"}
        count={allArtists?.length}
      /> */}

      <DashboardCard
        icon={<GiMusicalNotes className="text-3xl text-textColor" />}
        name={"Albums"}
        count={allAlbums?.length > 0 ? allAlbums.length : 0}
      />
    </div>
  );
};

export default DashboardHome;
