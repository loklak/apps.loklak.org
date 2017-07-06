import React from 'react';
import Datamap from 'datamaps';
import styles from '../../../css/bootstrap.min.css';
import customStyles from '../../css/style.css';
import fetchJsonp from 'fetch-jsonp';
import {getScores} from '../utils/score';
import getColor from '../utils/color';
import {host} from '../index';

export default class WorldMap extends React.Component {
    constructor() {
        super();
        this.state = {
            map: null
        };
        this.resize = this.resize.bind(this);
        this.globalInfo = this.globalInfo.bind(this);
        this.globalFetch = this.globalFetch.bind(this);
        // Resize map when window changes
        window.addEventListener('resize', this.resize);
    }

    globalFetch() {
        let since;
        let now = new Date();
        if (!this.state.global) {
            since = '';
        } else {
            switch (this.state.global.time) {
                case 'All':
                    since = '';
                    break;
                case 'Year':
                    since = '&since=' + now.getFullYear();
                    break;
                case 'Month':
                    since = '&since=' + now.getFullYear() + '-' + now.getMonth();
                    break;
                case 'Day':
                    since = '&since=' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
                    break;
                case 'Hour':
                    since = '&since=' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + 'T' + now.getHours();
            }
        }
        this.setState(...this.state, {global: {fetching: true, fetched: false, errored: false}, mapBorder: '#ffffff'});
        fetchJsonp(host + '/api/classifier.json?minified=true&classifier=emotion&all=true' + since, {
            timeout: 20000
        })
            .then((response) => {
                return response.json();
            }).then((json) => {
            let score = getScores(json.aggregations);
            this.setState(...this.state, {
                mapBorder: getColor(score), global: {
                    fetching: false, fetched: true, errored: false, score: score
                }
            });
        })
        .catch((error) => {
            this.setState(...this.state, {mapBorder: '#000000', global: {
                fetching: false, fetched: false, errored: true, message: error}});
        });
    }

    resize() {
        if (this.state.map) {
            this.state.map.resize();
            this.setState(...this.state, {map: this.state.map});
        }
    }

    globalInfo() {
        if (!this.state.global) {
            return (
                <span>Initialising...</span>
            )
        }
        if (this.state.global.fetching) {
            return (
                <span>Loading global statistics...</span>
            )
        }
        if (this.state.global.fetched) {
            return (
                <div>
                    <h4>Global statistics</h4>
                    <div className={styles.row}>
                    <div className={[styles.colXs12, styles.colSm6, styles.colMd6, styles.colLg6].join(' ')}>
                        <span style={{fontSize: '30px', color: '#D02010'}}>
                            {this.state.global.score.negative}
                        </span> Negative
                    </div>
                    <div className={[styles.colXs12, styles.colSm6, styles.colMd6, styles.colLg6].join(' ')}>
                        <span style={{fontSize: '30px', color: '#FFFB20'}}>
                            {this.state.global.score.positive}
                        </span> Positive
                    </div>
                </div>
                </div>
            )
        }
        if (this.state.global.errored) {
            return (
                <span className={styles.labelDanger}>Error loading global statistics: {this.state.global.message.message}</span>
            )
        }
    }

    changeGlobal(type) {
        let globalType = type.target.innerHTML;
        if (type.target.className.search(styles.active) >= 0) {
            return;
        }
        let global = this.state.global;
        global.time = globalType;
        this.setState(...this.state, {global: global});
        let elements = document.getElementsByClassName(styles.active);
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(styles.active);
        }
        type.target.classList.add(styles.active);
        this.globalFetch();
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={[styles.row, styles.textCenter].join(' ')}>
                    <button className={[styles.btn, styles.btnDefault].join(' ')} onClick={this.changeGlobal.bind(this)}>
                        All
                    </button>
                    <span className={[styles.btn, styles.btnDefault].join(' ')}  onClick={this.changeGlobal.bind(this)}>
                        Year
                    </span>
                    <span className={[styles.btn, styles.btnDefault].join(' ')}  onClick={this.changeGlobal.bind(this)}>
                        Month
                    </span>
                    <span className={[styles.btn, styles.btnDefault].join(' ')}  onClick={this.changeGlobal.bind(this)}>
                        Day
                    </span>
                    <span className={[styles.btn, styles.btnDefault].join(' ')}  onClick={this.changeGlobal.bind(this)}>
                        Hour
                    </span>
                </div>
                <div id="map-container" className={customStyles.map} style={{borderColor: this.state.mapBorder}}>
                </div>
                <div className={styles.textCenter}>{this.globalInfo()}</div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            map: new Datamap({
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
                            '<span style="font-size: 30px; color: #FFFB20;">',
                            pScore,
                            '</span>',
                            '<br/>Positive',
                            '</div>',
                            '<div>',
                            '<span style="font-size: 30px; color: #D02010;">',
                            nScore,
                            '</span>',
                            '<br/>Negative',
                            '</div>',
                        ].join('');
                    }
                }
            }),
            mapBorder: '#ffffff',
            global: {
                fetching: false,
                fetched: false,
                errored: false,
                time: 'All'
            },
        });

        this.globalFetch();
    }
}
