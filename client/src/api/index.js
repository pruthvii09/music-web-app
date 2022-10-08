import axios from "axios"

const baseURL = "http://localhost:4000/"

// validate the user 
export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers : {
                Authorization : "Bearer " + token,
            }
        })
        return res.data
    } catch (error) {
        
    }
};

// get all users 
export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers`)
        return res.data;
    } catch (error) {
        return null
    }
}

// get all artist 
export const getAllArtist = async () => {
    try {
        const res = await axios.get(`${baseURL}api/artists/getAll`)
        return res.data;
    } catch (error) {
        return null
    }
}

// get all album 
export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}api/albums/getAll`)
        return res.data;
    } catch (error) {
        return null
    }
}

// get all songs 
export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}api/songs/getAll`)
        return res.data;
    } catch (error) {
        return null
    }
}