import React, { Component } from 'react';
import logo from './logo.svg';
import Navi from './Navi.js';
import ArtistGallary from './ArtistGallary'
import './App.css';

import { createArtist, getArtists, updateArtist, deleteArtist } from './requests'

class App extends Component {
  constructor(props) {
    super(props);

    this.CreateArtist = this.CreateArtist.bind(this);
    this.UpdateArtist = this.UpdateArtist.bind(this);
    this.DeleteArtist = this.DeleteArtist.bind(this);

    this.state = {
      artists: {}
    }
  }

  CreateArtist(newArtistObject, callback) {
    createArtist(newArtistObject)
    .then(resp => { 
      console.log(resp);
      let newArtistsObj = Object.assign({}, this.state.artists, {[resp.data._id]: resp.data});
      this.setState({ artists: newArtistsObj }, () => {
        if(callback) { callback() }
      }) 
    })
  }

  UpdateArtist(artistsId, artistObject, callback) {
    updateArtist(artistsId, artistObject)
    .then(resp => {
      console.log(resp);
      let newArtistsObj = Object.assign({}, this.state.artists);
      newArtistsObj[artistsId] = artistObject;
      this.setState({ artists: newArtistsObj }, ()=> {
        if(callback) { callback() }
      }) 
    })
  }

  DeleteArtist(artistId, callback) {
    deleteArtist(artistId)
    .then(resp => {
      console.log(resp);
      let newArtistsObj = Object.assign({}, this.state.artists);
      delete newArtistsObj[artistId];
      this.setState({ artists: newArtistsObj }, ()=> {
        if(callback) { callback() }
      }) 
    })
  }

  componentDidMount () {
    getArtists()
    .then(resp => { 
        console.log(resp);
        let artists = {};
        resp.data.forEach(artist => {
          artists[artist._id] = artist;
        })
        this.setState({ artists }) 
    })
    .catch(err => console.log(err))
  }

  render() {
    //console.log(this);
    let artists = [];
    Object.keys(this.state.artists).forEach(key => {
      let artist = this.state.artists[key];
      artists.push(artist);
    })

    return (
      <div className="App">
        <Navi artists={artists} CreateArtist={this.CreateArtist}/>
        <ArtistGallary artists={artists} UpdateArtist={this.UpdateArtist} DeleteArtist={this.DeleteArtist}/>
      </div>
    );
  }
}

export default App;
