import React, { useEffect } from "react";
import { getAllAlbums, getAllArtist } from "../../api/index";
import { filterByLanguage, filters } from "../../utils/supportfunctions";
import FilterButtons from "../FilterButtons/FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/stateProvider";

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, artists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.artist });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.album });
      });
    }
  }, []);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };
  return (
    <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
      <FilterButtons filterData={artists} flag={"Artist"} />

      <div className=" flex items-center gap-6 mx-4">
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>

      <FilterButtons filterData={allAlbums} flag={"Albums"} />

      <FilterButtons filterData={filterByLanguage} flag={"Language"} />

      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilter}
      >
        <MdClearAll className="text-textColor text-xl cursor-pointer" />
      </motion.i>
    </div>
  );
};

export default Filter;
