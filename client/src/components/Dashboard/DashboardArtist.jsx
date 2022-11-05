import React, { useEffect } from "react";
import { getAllArtist } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/stateProvider";

const DashboardArtist = () => {
  const [{ artists }, dispatch] = useStateValue();
  // useEffect(() => {
  //   if (!artists) {
  //     getAllArtist().then((artists) => {
  //       dispatch({ type: actionType.SET_ARTISTS, artists: artists.artist });
  //     });
  //     console.log(artists.artist);
  //   }
  // }, []);
  return <div>DashboardArtist</div>;
};

export default DashboardArtist;
