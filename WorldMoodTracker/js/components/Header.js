import React from 'react';
import styles from '../../../css/bootstrap.min.css';
import customStyles from '../../css/style.css';

export default class Header extends React.Component {
    render() {
        return (
            <nav className={[styles.navbar].join(' ')}>
                <div className={styles.container}>
                    <div className={styles.navbarHeader} style={{marginLeft: '10px'}}>
                        <h1>
                            <span>World Mood Tracker</span>
                        </h1>
                        <h3>
                            Powered by&nbsp;
                            <span className={customStyles.loklak}>
                                <a href="http://loklak.org" target="_blank">loklak</a>
                            </span>
                        </h3>
                    </div>
                    <div className={[styles.collapse, styles.navbarCollapse].join(' ')}>
                        <ul className={[styles.nav, styles.navbarNav, styles.navbarRight].join(' ')}>
                            <li><a href="/">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="https://github.com/fossasia/apps.loklak.org/tree/master/WorldMoodTracker"
                                   target="_blank">Github</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
    }
