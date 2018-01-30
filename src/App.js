import React, { Component } from 'react';

import Navi from './Navi.js';
import ArtistGallary from './ArtistGallary'  
import './App.css';

//Hosted all Crude Functionaility within the same file, and imported here. 
//Head to @requests.js for more information.
import { createArtist, getArtists, updateArtist, deleteArtist } from './requests'

class App extends Component {
  constructor(props) {
    super(props);
    //Binded functions from the request file, it allows me to use these functioanilities of this functions.
    //it allows you to apply it within your rendering code...
    this.CreateArtist = this.CreateArtist.bind(this);
    this.UpdateArtist = this.UpdateArtist.bind(this);
    this.DeleteArtist = this.DeleteArtist.bind(this);

    //created Object Artists to host the artist Reviews in.
    this.state = {
      artists: {}
    }
  }

  //Create object takes in  NewArtistObject, with info submitted by the userss.
  CreateArtist(newArtistObject, callback) {
    createArtist(newArtistObject)
    .then(resp => { 
      console.log(resp);
      //Created clone of newArtistObj to be pushed back and show all Profiles including the Newly
      //Added one! 
      let newArtistsObj = Object.assign({}, this.state.artists, {[resp.data._id]: resp.data});
      this.setState({ artists: newArtistsObj }, () => {
        if(callback) { callback() }
      }) 
    })
  }
  //update artist takes artistID(See BackEND) in order to select the artist wanted to update 
  // There ID's are the unique identifier provided by the DB
  UpdateArtist(artistsId, artistObject, callback) {
    updateArtist(artistsId, artistObject)
    .then(resp => {
      console.log(resp);
      //sets the state of the artist to the updated version.
      let newArtistsObj = Object.assign({}, this.state.artists);
      //focuses on objs ID, and labels it artistObject 
      newArtistsObj[artistsId] = artistObject;
      this.setState({ artists: newArtistsObj }, ()=> {
        if(callback) { callback() }
      }) 
    })
  }
// This Function deletes using the ArtistID once again ensure the right selctions.
  DeleteArtist(artistId, callback) {
    //This second call gives us the abilityt o make a promise, that'll return the Database with the deleted artist.
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
// Here's where we grab all of the artist, to make sure they're ready for use!
  componentDidMount () {
    getArtists()
    .then(resp => { 
        console.log(resp);
        //created an object for artists
        let artists = {};
        // then looped over the array of objects by the artist id
        resp.data.forEach(artist => {
          artists[artist._id] = artist;
        })
        this.setState({ artists }) 
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log(this);
    let artists = [];
    //pushes all into array to be looped over. 
    Object.keys(this.state.artists).forEach(key => {
      let artist = this.state.artists[key];
      artists.push(artist);
      console.log(artist)
    })  
    

    return (
      <div className="App">
        {/* contains call to create new artist */}
        <Navi artists={artists} CreateArtist={this.CreateArtist}/>
        {/* allows you to use delete and update artist functions! */}
        <ArtistGallary artists={artists} UpdateArtist={this.UpdateArtist} DeleteArtist={this.DeleteArtist}/>
      </div>
    );
  }
}

export default App;
