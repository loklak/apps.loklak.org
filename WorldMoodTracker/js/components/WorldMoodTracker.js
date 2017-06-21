import React from 'react';
import Header from './Header';
import WorldMap from './WorldMap';
import Footer from './Footer';

export default class WorldMoodTracker extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <WorldMap/>
                <Footer />
            </div>
        )
    }
}
