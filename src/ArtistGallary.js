import React, { Component } from 'react';
import { func } from 'prop-types'
//React Materailize was used throughout my project, it's a framework that was paired with React for Optimal use!
import {Card, CardTitle, Button, Modal, Input, Row} from 'react-materialize'
import { getArtists } from './requests'

class ArtistGallary extends Component {
    //setting Class properies for my artist in this state! 
    // they'll be bound to this module specifically! 
    mainBox = {
        width: "625px",
        maxWidth: "100%",
        display: "block",
        margin: "auto",
        paddingTop: '15px'
    }
    cardBox = {
        width: "375px",
        maxWidth: "100%",
        display: "block",
        margin: "auto",
        marginBottom: '15px'
    }
    innerCard ={
        width: "200px",
        textAlign: "right"
    }
    artistInfo ={
        display:"inline"
    }
    icons ={
        width:"50px",
        height:"50px"
    }
    ul ={
        listStyleType: 'none',
        margin: 0,
        padding: 0
    }
    li ={
        display:"inline-block",
        padding: "5px"
    }
    //the state renders with blank spaces for space holders!
    //Adds ratings to the Database as well.
    state = {
        name: "",
        img: "",
        soundcloud: "",
        youtube: "",
        itunes: "",
        spotify: "",
        tidal: "",
        twitter: "",
        instagram: "",
        snapchat: "",
        facebook: "",

        flow: 0,
        delivery: 0,
        style: 0,
        visuals: 0,
        unique: 0,
        article: "write an article...",
        commenter: "",
        rating: 0
    }

    delete(artist) {
        //ASK is checking if if the artist you selected is the one you want to delete
        var ask = window.confirm('Delete: ' + artist.name + '?');
        if(ask == false) { return; }
        this.props.DeleteArtist(artist._id, () => {
            window.alert('Artist Deleted!');
        })
    }

    edit(artist) {
        //Tells user it needs to have something in EVERY field, if it doesn't it'll as for it
        if(Object.keys(this.state).length === 0) { alert('please fill out all fields'); return; }
        //this is letting you know that the artist name is required
        if(!this.state.name) { alert('name is required'); return; }
        
        this.props.UpdateArtist(artist._id, this.state, () => {
            window.alert('Artist Updated!');
        });
    }
    
    render() {
       // console.log(this);
        
        return (
            //see the use of the mainBox!
            <div style={this.mainBox}>
               {/* Loops  through the object at length, then Maps them into an index for the app to use! */}
                { this.props.artists.length > 0 && 
                    this.props.artists.map((artist, index) => (
                        // a card that holds the review of the artist! 
                        <Card 
                            style={this.cardBox}
                            //note the KEY is labled as index, it'll loop throughhh all objects we have and display a card for them. 
                            key={index} header={<CardTitle reveal image={artist.img} waves='light'/>}
                            title={artist.name}
                            reveal={
                                <div style={this.artistInfo}>
                                    <img style={this.innerCard}src= {artist.img} />
                                    <h6>How I See It!</h6>
                                    <p>{artist.article}</p>
                                    <h5>Social</h5>
                                    <ul style={this.ul}>
                                    <li style={this.li}>
                                    <a href={artist.twitter} target="_blank">
                                    <img style={this.icons} src = 'http://simpleicon.com/wp-content/uploads/twitter-2.png' alt="twitter" />
                                    </a>
                                    </li>
                                    <li style={this.li}>
                                    <a href={artist.instagram} target="_blank">
                                    <img style={this.icons} src = 'https://i.imgur.com/mU2Bczn.png' alt="instagram" />
                                    </a>
                                    </li>
                                    <li style={this.li}>
                                    <a href={artist.snapchat} target="_blank">
                                    <img style={this.icons} src = 'https://i.imgur.com/3fBYS9s.png' alt="snapchat" />
                                    </a>
                                    </li>
                                    <li style={this.li}>
                                    <a href={artist.facebook} target="_blank">
                                    <img style={this.icons} src = 'https://i.imgur.com/DolpqiD.png' alt="facebook" />
                                    </a>
                                    </li>
                                    </ul>
                                    <h5>Music</h5>
                                    <ul style={this.ul}>
                                    <li style={this.li}>
                                    <a href={artist.itunes} target="_blank">
                                    <img style={this.icons} src = 'https://i.imgur.com/ItW4DWH.png' alt="itunes" />
                                    </a>
                                    </li>
                                    <li style={this.li}>
                                    <a href={artist.spotify} target="_blank">
                                    <img style={this.icons} src = 'https://i.imgur.com/Ih8AQBS.png' alt="spotify" />
                                    </a>
                                    </li>
                                    <li style={this.li}>
                                    <a href={artist.soundcloud} target="_blank">
                                    <img style={this.icons} src = 'https://i.imgur.com/68SCLJp.png' alt="soundcloud" />
                                    </a>
                                    </li>
                                    <li style={this.li}>
                                    <a href={artist.tidal} target="_blank">
                                    <img style={this.icons} src = 'https://i.imgur.com/JLxVZt6.png' alt="tidal" />
                                    </a>
                                    </li>
                                    </ul>
                                    <h5>Ratings:</h5>
                                    <ul style={this.ul}>
                                    <li style={this.li}>
                                    <h6>Flow:<b>{artist.flow}</b></h6>
                                    </li>
                                    <li style={this.li}>
                                    <h6>Delivery::<b>{artist.delivery}</b></h6>
                                    </li>
                                    <li style={this.li}>
                                    <h6>Visuals::<b>{artist.visuals}</b></h6>
                                    </li>
                                    <li style={this.li}>
                                    <h6>Unique::<b>{artist.unique}</b></h6>
                                    </li>
                                    </ul>
                                </div>
                            }>
		                    
                            <Modal 
                            // Here is some more information about this product that is only revealed once clicked on.</p>}>
		                    // this one was a tricky, learned more about modalOption, it allowed the use of the button...
                            // And was the key to EDITING DATA CORRECTLY!
                                modalOptions={{ready: () => { this.setState({ ...artist }) }}}
                                header='Update Artist' trigger={<Button>Update Artist</Button>}>
                            <Row>
                            <Input placeholder="Enter Name" s={12} label="First Name" defaultValue={artist.name}
                                onChange={(event, name) => { this.setState({ name }) }}/>
                            <Input placeholder="Enter Image URL" s={12} label="Image URL" defaultValue={artist.img}
                                onChange={(event, img) => { this.setState({ img }) }}/>
                            
                            <Input placeholder="Enter SoundCloud URL" s={12} label="SoundCloud" defaultValue={artist.soundcloud}
                                onChange={(event, soundcloud) => { this.setState({ soundcloud }) }}/>
                            <Input placeholder="Enter YouTube URL" s={12} label="YouTube" defaultValue={artist.youtube}
                                onChange={(event, youtube) => { this.setState({ youtube }) }}/>
                            <Input placeholder="Enter iTunes URL" s={12} label="iTunes" defaultValue={artist.itunes}
                                onChange={(event, itunes) => { this.setState({ itunes }) }}/>
                            <Input placeholder="Enter Spotify URL" s={12} label="Spotify" defaultValue={artist.spotify}
                                onChange={(event, spotify) => { this.setState({ spotify }) }}/>
                            <Input placeholder="Enter Tidal URL" s={12} label="Tidal" defaultValue={artist.tidal}
                                onChange={(event, tidal) => { this.setState({ tidal }) }}/>
                            <Input placeholder="Enter Twitter URL" s={12} label="Twitter" defaultValue={artist.twitter}
                                onChange={(event, twitter) => { this.setState({ twitter }) }}/>
                            <Input placeholder="Enter Instagram URL" s={12} label="Instagram" defaultValue={artist.instagram}
                                onChange={(event, instagram) => { this.setState({ instagram }) }}/>
                            <Input placeholder="Enter SnapChat URL" s={12} label="SnapChat" defaultValue={artist.snapchat}
                                onChange={(event, snapchat) => { this.setState({ snapchat }) }}/>
                            <Input placeholder="Enter Facebook URL" s={12} label="Facebook" defaultValue={artist.facebook}
                                onChange={(event, facebook) => { this.setState({ facebook }) }}/>

                            <Input placeholder="Enter Flow" s={12} label="Flow" defaultValue={artist.flow}
                                onChange={(event, flow) => { this.setState({ flow: Number(flow) }) }}/>
                            <Input placeholder="Enter Delivery" s={12} label="Delivery" defaultValue={artist.delivery}
                                onChange={(event, delivery) => { this.setState({ delivery: Number(delivery) }) }}/>
                            <Input placeholder="Enter Style" s={12} label="Style" defaultValue={artist.style}
                                onChange={(event, style) => { this.setState({ style: Number(style) }) }}/>
                            <Input placeholder="Enter Visuals" s={12} label="Visuals" defaultValue={artist.visuals}
                                onChange={(event, visuals) => { this.setState({ visuals: Number(visuals) }) }}/>
                            <Input placeholder="Enter Unique" s={12} label="Unique" defaultValue={artist.unique}
                                onChange={(event, unique) => { this.setState({ unique: Number(unique) }) }}/>
                            <Input placeholder="Enter Article" s={12} label="Article" defaultValue={artist.article}
                                onChange={(event, article) => { this.setState({ article }) }}/>
                            <Input placeholder="Enter Commenter" s={12} label="Commenter" defaultValue={artist.commenter}
                                onChange={(event, commenter) => { this.setState({ commenter }) }}/>
                            <Input placeholder="Enter Rating" s={12} label="Rating" defaultValue={artist.rating}
                                onChange={(event, rating) => { this.setState({ rating: Number(rating) }) }}/>

                            <Button waves='light' onClick={() => { this.edit(artist) }}>EDIT</Button>
                            </Row>
	                        </Modal>
                            <br/><br/>
                            <Button className="red" onClick={() => { this.delete(artist) }}>Delete Artist</Button>
                        </Card>
                    ))
                }

            </div>
        )
    }
}

export default ArtistGallary