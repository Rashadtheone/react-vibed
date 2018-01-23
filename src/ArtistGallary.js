import React, { Component } from 'react';
import { func } from 'prop-types'
import {Card, CardTitle, Button, Modal, Input, Row} from 'react-materialize'
import { getArtists } from './requests'

class ArtistGallary extends Component {

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
    bg = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    }

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
        var ask = window.confirm('Delete: ' + artist.name + '?');
        if(ask == false) { return; }
        this.props.DeleteArtist(artist._id, () => {
            window.alert('Artist Deleted!');
        })
    }

    edit(artist) {
        if(Object.keys(this.state).length === 0) { alert('please fill out all fields'); return; }
        if(!this.state.name) { alert('name is required'); return; }
        
        this.props.UpdateArtist(artist._id, this.state, () => {
            window.alert('Artist Updated!');
        });
    }
    
    render() {
       // console.log(this);
        
        return (
            <div style={this.mainBox}>
                { this.props.artists.length > 0 && 
                    this.props.artists.map((artist, index) => (
                        <Card 
                            style={this.cardBox}
                            key={index} header={<CardTitle reveal image={artist.img} waves='light'/>}
                            title={artist.name}
                            reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
		                    
                            <Modal 
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