import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { storage } from "../../config/firebase.config";

import FilterButtons from "../FilterButtons/FilterButtons";
import { filterByLanguage, filters } from "../../utils/supportfunctions";
import { useStateValue } from "../../context/stateProvider";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewSong,
  saveNewArtist,
  saveNewAlbum,
} from "../../api";
import { actionType } from "../../context/reducer";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [songImageCover, setSongImageCover] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const [
    {
      artists,
      allAlbums,
      allSongs,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
      alertType,
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ARTISTS,
          ...data,
          artists: data.artist,
        });
        console.log(data);
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.album });
      });
    }
  }, [!artists, !allAlbums]);

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
      setIsAudioLoading(true);
      setIsAlbumUploading(true);
      setIsArtistUploading(true);
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
      setSongImageCover(null);
      setAudioImageCover(null);
      setAlbumImageCover(null);
      setArtistImageCover(null);
      setIsImageLoading(false);
      setIsAudioLoading(false);
      setIsAlbumUploading(false);
      setIsArtistUploading(false);
    });
  };

  const saveSong = () => {
    if (!songImageCover || !audioImageCover) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: songName,
        imageURL: songImageCover,
        songURL: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };
      saveNewSong(data).then((res) => {
        getAllSongs().then((songs) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.songs,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      console.log(alertType);
      console.log("Saved Artist");
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);

      setSongName(null);
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setSongImageCover(null);
      setAudioImageCover(null);
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    }
  };

  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      //  error
    } else {
      setIsArtistUploading(true);
      const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: `www.twitter,com/${twitter}`,
        instagram: `www.instagram.com/${instagram}`,
      };
      saveNewArtist(data).then((res) => {
        getAllArtist().then((data) => {
          dispatch({
            type: actionType.SET_ARTISTS,
            allArtist: data.artist,
          });
        });
      });
      setIsArtistUploading(false);
      setArtistImageCover(null);
      setTwitter("");
      setInstagram("");
    }
  };

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      //  eooro
    } else {
      console.log("Hi");
      setIsAlbumUploading(true);

      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };
      saveNewAlbum(data).then(() => {
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMNS,
            allAlbums: data.album,
          });
        });
      });
      setIsAlbumUploading(false);
      setAlbumImageCover(null);
      setAlbumName("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
      <div>
        <h1 className="text-2xl font-bold flex items-center justify-center mb-4">
          Song Details
        </h1>
        <input
          type="text"
          placeholder="Type your song name..."
          className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <div className="flex flex-wrap justify-between items-center mt-4 gap-10">
          <FilterButtons filterData={artists} flag={"Artist"} />
          <FilterButtons filterData={allAlbums} flag={"Albums"} />
          <FilterButtons filterData={filterByLanguage} flag={"Language"} />
          <FilterButtons filterData={filters} flag={"Category"} />

          <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300">
            {isImageLoading && <FileLoader progress={imageUploadProgress} />}
            {!isImageLoading && (
              <>
                {!songImageCover ? (
                  <FileUploader
                    updateState={setSongImageCover}
                    setProgress={setImageUploadProgress}
                    isLoading={setIsImageLoading}
                    isImage={true}
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-md ">
                    <img
                      src={songImageCover}
                      className="w-full h-full object-cover "
                      alt=""
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                      onClick={() => deleteFileObject(audioImageCover, false)}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* audio File  */}
          <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300">
            {isAudioLoading && <FileLoader progress={audioUploadingProgress} />}
            {!isAudioLoading && (
              <>
                {!audioImageCover ? (
                  <FileUploader
                    updateState={setAudioImageCover}
                    setProgress={setAudioUploadingProgress}
                    isLoading={setIsAudioLoading}
                    isImage={false}
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-md flex items-center justify-center ">
                    <audio src={audioImageCover} controls></audio>
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                      onClick={() => deleteFileObject(audioImageCover, false)}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center w-60 p-4">
            {isImageLoading || isAudioLoading ? (
              <DisabledButton />
            ) : (
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="px-8 py-2 w-full cursor-pointer flex items-center justify-center rounded-md text-white bg-red-600 hover:shadow-lg"
                onClick={saveSong}
              >
                Save Song
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* image upload for artist  */}
      <h1 className="text-2xl font-bold">Artist Details</h1>
      <input
        type="text"
        placeholder="Type Artist Name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <div className="flex items-center rounded-md p-3 border border-gray-300 w-full">
        <p className="text-base font-semibold text-gray-400">
          www.twitter.com/
        </p>
        <input
          type="text"
          placeholder="Your Twitter ID"
          className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>
      <div className="flex items-center rounded-md p-3 border border-gray-300 w-full">
        <p className="text-base font-semibold text-gray-400">
          www.instagram.com/
        </p>
        <input
          type="text"
          placeholder="Your Instagram ID"
          className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>
      <div className="bg-card backdrop-blur-md  w-full h-300 rounded-md border-2 border-dotted border-gray-300">
        {isArtistUploading && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState={setArtistImageCover}
                setProgress={setArtistUploadingProgress}
                isLoading={setIsArtistUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md ">
                <img
                  src={artistImageCover}
                  className="w-full h-full object-cover "
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(artistImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div>
        <div className="flex items-start justify-center w-60 p-4">
          {isArtistUploading ? (
            <DisabledButton />
          ) : (
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="px-8 cursor-pointer py-2 w-full flex items-center justify-center rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveArtist}
            >
              Save Artist
            </motion.div>
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold">Album Details</h1>
      <input
        type="text"
        placeholder="Type Album Name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />
      <div className="bg-card backdrop-blur-md  w-full h-300 rounded-md border-2 border-dotted border-gray-300">
        {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateState={setAlbumImageCover}
                setProgress={setAlbumUploadingProgress}
                isLoading={setIsAlbumUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md ">
                <img
                  src={albumImageCover}
                  className="w-full h-full object-cover "
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(albumImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div>
        <div className="flex items-start justify-center w-60 p-4">
          {isAlbumUploading ? (
            <DisabledButton />
          ) : (
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="px-8 cursor-pointer py-2 w-full flex items-center justify-center rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveAlbum}
            >
              Save Album
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center"
    >
      <svg
        role="status"
        class="inline mr-3 w-4 h-4 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};
export const FileLoader = ({ progress }) => {
  return (
    <div className="flex flex-col mt-[6rem] justify-center items-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        {/* <span className="visually-hidden">Loading...</span> */}
      </div>
    </div>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const [{ alertType }, dispatch] = useStateValue();
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
      }
    );
  };
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to Upload {isImage ? "Image" : "Audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="w-0 h-0"
        onChange={uploadFile}
      />
    </label>
  );
};

export default DashboardNewSong;
