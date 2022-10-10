import React, { useEffect, useState } from "react";

import FilterButtons from "../FilterButtons/FilterButtons";
import { filterByLanguage, filters } from "../../utils/supportfunctions";
import { useStateValue } from "../../context/stateProvider";
import { getAllAlbums, getAllArtist } from "../../api";
import { actionType } from "../../context/reducer";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [{ artist, allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!artist) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ARTISTS,
          ...data,
          artist: data.artist,
        });
        console.log(data);
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.album });
      });
    }
  }, [!artist, !allAlbums]);
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
      <input
        type="text"
        placeholder="Type your song name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div className="flex flex-wrap justify-between items-center gap-10">
        <FilterButtons filterData={artist} flag={"Artist"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>
    </div>
  );
};

export default DashboardNewSong;
