import {Modal} from 'react-overlays';
import React from 'react';
import {host} from '../index';
import styles from '../../../css/bootstrap.min.css';

const modalStyle = {
    position: 'fixed',
    zIndex: 10,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    position: 'fixed',
    top: 0, bottom: 0, left: 0, right: 0,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

const dialogStyle = function () {
    return {
        position: 'absolute',
        width: '100%',
        top: '5vh',
        height: '95vh',
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
    };
};

function getTweetHtml(json) {
    return (
        <div style={{padding: '5px', borderRadius: '3px', border: '1px solid black', margin: '10px'}}>
            <a href={json.link} target="_blank">
            <div style={{marginBottom: '5px'}}>
                <b>@{json['screen_name']}</b>
            </div>
            <div style={{overflowX: 'hidden'}}>{json['text']}</div>
            </a>
        </div>
    )
}

export default class StreamOverlay extends React.Component {
    constructor (props) {
        super(props);
        this.state = {channel: this.props.channel, country: this.props.country, tweets: []};
        this.close = this.close.bind(this);
        this.eventSource = null;
    };

    close() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
        this.props.onClose();
    }

    startEventSource(country) {
        let channel = 'twitter%2Fcountry%2F' + country;
        if (this.eventSource) {
            return;
        }
        this.eventSource = new EventSource(host + '/api/stream.json?channel=' + channel);
        this.eventSource.onmessage = (event) => {
            let json = JSON.parse(event.data);
            this.state.tweets.push(json);
            if (this.state.tweets.length > 250) {
                this.state.tweets.shift();
            }
            this.setState(this.state);
        };
    }

    render () {
        this.startEventSource(this.props.channel);
        return (
            <div className={styles.container}>
                <Modal aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    show={true}
                    onHide={this.close}>
                    <div style={dialogStyle()}>
                        <h2 id='modal-label'>Streaming Tweets from&nbsp;
                            <span  style={{background: '-webkit-linear-gradient(0deg, #D02010 2%, #FFFB20 98%)',
                            'WebkitTextFillColor': 'transparent',
                            'WebkitBackgroundClip': 'text',
                            }}>{this.state.country}</span></h2>
                        <div className={styles.container} style={{'height': '100%', 'overflowY': 'auto',
                            'overflowX': 'hidden', maxWidth: '100%'}}>
                            {this.state.tweets.reverse().map(getTweetHtml)}
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
};
