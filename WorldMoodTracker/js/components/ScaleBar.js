import React from 'react';
import customStyles from '../../css/style.css';
import bootstrapStyles from '../../../css/bootstrap.min.css';

export default class ScaleBar extends React.Component {
    render() {
        return (
            <div className={[bootstrapStyles.container, customStyles.scaleBarContainer].join(' ')}>
                <div className={[bootstrapStyles.textCenter, customStyles.scaleBarText].join(' ')}>
                    <span className={bootstrapStyles.pullLeft}>Negative</span>
                    <span>Moderate</span>
                    <span className={bootstrapStyles.pullRight}>Positive</span>
                </div>
                <div className={[customStyles.scaleBar].join(' ')}>
                </div>
            </div>
        )
    }
}
