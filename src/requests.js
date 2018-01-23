import axios from 'axios'
import { CLIENT_URL } from './constants'


export function createArtist(artistObj) {
    return axios.post(`${CLIENT_URL}/vibed`, artistObj)
} 

export function getArtists() {
    return axios.get(`${CLIENT_URL}/vibed`)
} 

export function updateArtist(artistsId, artistObj) {
    return axios.put(`${CLIENT_URL}/vibed/${artistsId}`, artistObj)
} 

export function deleteArtist(artistsId) {
    return axios.delete(`${CLIENT_URL}/vibed/${artistsId}`)
} 

