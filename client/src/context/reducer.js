export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_ALL_ALBUMS:"SET_ALL_ALBUMS",  
};

const reducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.SET_ALL_USERS,
      }
    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.SET_ALL_SONGS,
      }
    case actionType.SET_ALL_ARTISTS:
      return {
          ...state,
          allArtists: action.SET_ALL_ARTISTS,
      } 
    case actionType.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.SET_ALL_ALBUMS,
      }     
    default:
      return state;
  } 
};

export default reducer;
