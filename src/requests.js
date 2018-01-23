import axios from 'axios'
import { CLIENT_URL } from './constants'

//this function creates an artist then sends it over to the database as Json artistObject!
export function createArtist(artistObj) {
    return axios.post(`${CLIENT_URL}/vibed`, artistObj)
} 
//This functions provides the GET Functionaility! 
export function getArtists() {
    return axios.get(`${CLIENT_URL}/vibed`)
} 
//EDIT your artist with appropriate infomations Using string interpolation 
export function updateArtist(artistsId, artistObj) {
    return axios.put(`${CLIENT_URL}/vibed/${artistsId}`, artistObj)
} 
//DELETEE SELCTED BY THE ID AS WELLL
export function deleteArtist(artistsId) {
    return axios.delete(`${CLIENT_URL}/vibed/${artistsId}`)
} 

