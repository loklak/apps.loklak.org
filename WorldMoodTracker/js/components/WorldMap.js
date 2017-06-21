import React from 'react';
import Datamap from 'datamaps';
import styles from '../../../css/bootstrap.min.css';

export default class WorldMap extends React.Component {
    constructor() {
        super();
        this.state = {
            map: null
        };
        this.resize = this.resize.bind(this, this.state.map);
        // Resize map when window changes
        window.addEventListener('resize', this.resize);
    }

    resize() {
        if (this.state.map) {
            this.state.map.resize();
            this.setState({map: this.state.map});
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div id="map-container">
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({map: new Datamap({
            element: document.getElementById('map-container'),
            responsive: true,
            fills: {defaultFill: 'rgba(200,200,200,0.8)'},
            geographyConfig: {
                highlightFillColor: '#707070',
                highlightBorderColor: 'rgba(243, 243, 21, 0.2)',
                highlightBorderWidth: 4,
                popupTemplate: function (geo, data) {
                    let nScore, pScore;
                    if (data) {
                        if (data.positiveScore) {
                            pScore = data.positiveScore;
                        } else {
                            pScore = 'No Data';
                        }
                        if (data.negativeScore) {
                            nScore = data.negativeScore;
                        } else {
                            nScore = 'No Data';
                        }
                    } else {
                        pScore = 'No Data';
                        nScore = 'No Data';
                    }
                    return [
                        '<div class="hoverinfo" style="text-align: center; padding: 10px;">',
                        '<strong>',
                        geo.properties.name,
                        '</strong>',
                        '<div>',
                        '<span style="font-size: 30px; color: yellow;">',
                        pScore,
                        '</span>',
                        '<br/>Positive',
                        '</div>',
                        '<div>',
                        '<span style="font-size: 30px; color: brown;">',
                        nScore,
                        '</span>',
                        '<br/>Negative',
                        '</div>',
                    ].join('');
                }
            }
        })});
    }
}
