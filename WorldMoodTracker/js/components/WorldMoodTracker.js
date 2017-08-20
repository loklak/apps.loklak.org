import React from 'react';
import Header from './Header';
import WorldMap from './WorldMap';
import Footer from './Footer';
import ScaleBar from './ScaleBar';
import StreamOverlay from "./StreamOverlay";

export default class WorldMoodTracker extends React.Component {

    constructor() {
        super();
        this.state = {enabled: false};
        this.showStream = this.showStream.bind(this);
        this.getStreamOverlay = this.getStreamOverlay.bind(this);
        this.onOverlayClose = this.onOverlayClose.bind(this);
    }

    onOverlayClose() {
        this.state.enabled = false;
        this.setState(this.state);
    }

    getStreamOverlay() {
        if (this.state.enabled) {
            return (<StreamOverlay
                show={true} channel={this.state.channel}
                country={this.state.country} onClose={this.onOverlayClose}/>);
        }
    }

    showStream(countryName, countryCode) {
        this.state.channel = countryCode;
        this.state.country = countryName;
        this.state.enabled = true;
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <Header/>
                {this.getStreamOverlay()}
                <WorldMap showStream={this.showStream}/>
                <ScaleBar/>
                <Footer/>
            </div>
        )
    }
    }
