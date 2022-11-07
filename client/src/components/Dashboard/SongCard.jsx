import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/stateProvider";
import {
  deleteAlbumById,
  deleteSongById,
  getAllAlbums,
  getAllSongs,
} from "../../api";
import { actionType } from "../../context/reducer";
import { IoTrash } from "react-icons/io5";
import { storage } from "../../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";
import { BsHeart } from "react-icons/bs";

const SongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);

  const [
    { artists, allAlbums, allSongs, alertType, songIndex, isSongPlaying },
    dispatch,
  ] = useStateValue();

  const deleteData = (data) => {
    const deleteRef = ref(storage, data.imageURL);

    deleteObject(deleteRef).then(() => {});
    deleteSongById(data._id).then((res) => {
      if (res.data) {
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.song,
          });
        });
      }
    });
    deleteAlbumById(data._id).then((res) => {
      if (res.data) {
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMNS,
            allSongs: data.album,
          });
        });
      }
    });
  };

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);

  const addToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  const [like, setLike] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center justify-center"
      onClick={type === "song" && addToContext}
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1 }}
          src={data.imageURL}
          className="w-full h-full rounded-lg object-cover"
        ></motion.img>
      </div>

      <p className="text-base text-headingColor font-semibold my-2 flex flex-col items-center justify-center">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data.artist.length > 25
              ? `${data.artist.slice(0, 25)}..`
              : data.artist}
          </span>
        )}
      </p>

      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 hover:text-red-600 drop-shadow-md"
          onClick={() => setIsDelete(true)}
        >
          <IoTrash />
        </motion.i>
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 ml-2 hover:text-red-600 drop-shadow-md"
        >
          <BsHeart className="ml-5" />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-headingColor text-lg font-semibold text-center">
            Are you sure you want to delete it?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500"
              whileTap={{ scale: 0.75 }}
              onClick={() => deleteData(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase  bg-green-300 rounded-md hover:bg-green-500"
              whileTap={{ scale: 0.75 }}
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
