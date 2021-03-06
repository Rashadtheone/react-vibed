import React, { Component } from 'react';
import {Navbar, NavItem, Icon, Modal, Button, Row, Input} from 'react-materialize'
//Note the different functions imported on each Module! 
import { createArtist } from './requests'
import ArtistGallary from './ArtistGallary';

class Navi extends Component {
    //sets default values for this state! PEEP THE CHICKEN!
    state = {
        name: "",
        img: "http://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/5/1/0/0039592F3_beer-can-chicken_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382539274625.jpeg",
        soundcloud: "",
        youtube: "",
        itunes: "",
        spotify: "",
        tidal: "",
        twitter: "",
        instagram: "",
        snapchat: "",
        facebook: ""
    }

    //Create NEW ARTIST FUNCTION
    createNewArtist() {
        //First if Validates if you're actully passing a value
        if(Object.keys(this.state).length === 0) { alert('please fill out all fields'); return; }
        //attaches these default values AFTER the artist is created!
        var newArtistObject = Object.assign({}, this.state, {
            flow: 0,
            delivery: 0,
            style: 0,
            visuals: 0,
            unique: 0,
            article: "write an article...",
            commenter: "",
            rating: 0
        });
        //console.log(newArtistObject);
        //return;
        this.props.CreateArtist(newArtistObject, () => {
            window.alert('Artist Created!');
        });
    }

    render () {
        // console.log(this);
        
        return (
            <div>
                <Navbar brand='Vibed' right>
                    <Modal header='Create Artist' trigger={<Button>Create Artist</Button>}>
                        <Row>
                            {/* peep the input butttons, they're set up with functions Creating NEW ArtistGallar
                            YOU WON"T SEE THIS PAGE UNTIL AFTER YOU HIT CREATE ARTIST MODAL! */}
                            <Input placeholder="Enter Name" s={12} label="First Name" 
                                onChange={(event, name) => { this.setState({ name }) }}/>
                            <Input placeholder="Enter Image URL" s={12} label="Image URL" 
                                onChange={(event, img) => { this.setState({ img }) }}/>
                            
                            <Input placeholder="Enter SoundCloud URL" s={12} label="SoundCloud" 
                                onChange={(event, soundcloud) => { this.setState({ soundcloud }) }}/>
                            <Input placeholder="Enter YouTube URL" s={12} label="YouTube" 
                                onChange={(event, youtube) => { this.setState({ youtube }) }}/>
                            <Input placeholder="Enter iTunes URL" s={12} label="iTunes" 
                                onChange={(event, itunes) => { this.setState({ itunes }) }}/>
                            <Input placeholder="Enter Spotify URL" s={12} label="Spotify" 
                                onChange={(event, spotify) => { this.setState({ spotify }) }}/>
                            <Input placeholder="Enter Tidal URL" s={12} label="Tidal" 
                                onChange={(event, tidal) => { this.setState({ tidal }) }}/>
                            <Input placeholder="Enter Twitter URL" s={12} label="Twitter" 
                                onChange={(event, twitter) => { this.setState({ twitter }) }}/>
                            <Input placeholder="Enter Instagram URL" s={12} label="Instagram" 
                                onChange={(event, instagram) => { this.setState({ instagram }) }}/>
                            <Input placeholder="Enter SnapChat URL" s={12} label="SnapChat" 
                                onChange={(event, snapchat) => { this.setState({ snapchat }) }}/>
                            <Input placeholder="Enter Facebook URL" s={12} label="Facebook" 
                                onChange={(event, facebook) => { this.setState({ facebook }) }}/>
                                {/* Where it's actually sending it off to the new Databse using the createNewARtist Function.  */}
                            <Button waves='light' onClick={() => { this.createNewArtist() }}>SUBMIT</Button>
                        </Row>
	                </Modal>
                </Navbar>
            </div>
        )
    }

}

export default Navi