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
                    <Modal id="artistEntry" header='Create Artist' trigger={<Button>Create Artist</Button>}>

                            {/* peep the input butttons, they're set up with functions Creating NEW ArtistGallar
                            YOU WON"T SEE THIS PAGE UNTIL AFTER YOU HIT CREATE ARTIST MODAL! */
                            /*   <Input placeholder="new" s={12} label="Image URL"
                                      onChange={(event, name) => { this.setState({ name }) }}/>

                                */}
                        <Row>
                            <Input s={12} placeholder="Name"
                                onChange={(event, name) => { this.setState({ name }) }}/>
                            <Input s={12} placeholder="Image URL"
                                      onChange={(event, img) => { this.setState({ img }) }}/>
                            <Input s={12} placeholder="SoundCloud"
                                      onChange={(event, soundcloud) => { this.setState({ soundcloud }) }}/>
                            <Input s={12} placeholder="YouTube"
                                      onChange={(event, youtube) => { this.setState({ youtube }) }}/>
                            <Input s={12} placeholder="iTunes"
                                      onChange={(event, itunes) => { this.setState({ itunes }) }}/>
                            <Input s={12} placeholder="Spotify"
                                      onChange={(event, spotify) => { this.setState({ spotify }) }}/>
                            <Input s={12} placeholder="Tidal"
                                      onChange={(event, tidal) => { this.setState({ tidal }) }}/>
                            <Input s={12} placeholder="Twitter"
                                      onChange={(event, twitter) => { this.setState({ twitter }) }}/>
                            <Input s={12} placeholder="Instagram"
                                      onChange={(event, instagram) => { this.setState({ instagram }) }}/>
                            <Input s={12} placeholder="SnapChat"
                                      onChange={(event, snapchat) => { this.setState({ snapchat }) }}/>
                            <Input s={12} placeholder="Facebook"
                                      onChange={(event, facebook) => { this.setState({ facebook }) }}/>
</Row>
                                {/* Where it's actually sending it off to the new Databse using the createNewARtist Function.  */}
                            <Button waves='light' onClick={() => { this.createNewArtist() }}>SUBMIT</Button>

	                </Modal>
                </Navbar>
            </div>
        )
    }

}

export default Navi
