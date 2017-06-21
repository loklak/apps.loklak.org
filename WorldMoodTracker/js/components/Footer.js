import React from 'react';
import styles from '../../../css/bootstrap.min.css';
import custom from '../../css/style.css';

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className={styles.container}>
                    <div className={[styles.hiddenLg, styles.hiddenMd, styles.hiddenSm, styles.textCenter,
                        custom.footerLink].join(' ')}>
                        <a href="/">Home</a>
                        <a href="#">About</a>
                        <a href="https://github.com/fossasia/apps.loklak.org/tree/master/WorldMoodTracker"
                                                              target="_blank">Github</a>
                    </div>
                </div>
            </footer>
        )
    }
}
