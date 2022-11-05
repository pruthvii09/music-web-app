import React, { useState } from "react";
import { RiPlayListFill } from "react-icons/ri";
import { useStateValue } from "../../context/stateProvider";
import { motion } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useEffect } from "react";
import { getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";
import { IoClose, IoMusicalNote } from "react-icons/io5";

const MusicPlayer = () => {
  const nextTrack = () => {
    if (songIndex > allSongs.length - 1) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1,
      });
    }
  };

  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1,
      });
    }
  };

  const closePlayer = () => {
    dispatch({
      type: actionType.SET_ISSONG_PLAYING,
      isSongPlaying: false,
    });
  };

  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
  const [isPlayList, setIsPlayList] = useState(false);
  return (
    <div className="w-full flex items-center gap-3">
      <div className={`w-full items-center gap-3 flex relative`}>
        <img
          src={allSongs[songIndex]?.imageURL}
          className="w-20 p-1 h-20 object-fit rounded-md"
          alt=""
        />

        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}
            <span className="text-base">({allSongs[songIndex]?.album})</span>
          </p>
          <p className="text-textColor">
            {allSongs[songIndex]?.artist}
            <span>({allSongs[songIndex]?.category})</span>
          </p>

          <motion.i
            whileTap={{ scale: 0.75 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor" />
          </motion.i>
        </div>

        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songURL}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        {isPlayList && <PlayListCard />}
        <IoClose onClick={closePlayer} className="cursor-pointer" />
      </div>
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
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

  const setCurrentPlayingSong = (index) => {
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
  return (
    <div>
      <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll rounded-md shadow-md bg-primary">
        {allSongs.length > 0 ? (
          allSongs.map((music, index) => (
            <motion.div
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
              onClick={() => setCurrentPlayingSong(index)}
            >
              <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor pointer" />
              <div className="flex items-start flex-col">
                <p className="text-lg text-headingColor font-semibold">
                  {`${
                    music?.name.length > 20
                      ? music?.name.slice(0, 20)
                      : music?.name
                  }`}
                  <span className="text-base">({music?.album})</span>
                </p>

                <p className="text-textColor">
                  {music?.artist}
                  <span className="text-sm text-textColor fony-semibold">
                    ({music?.category})
                  </span>
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
