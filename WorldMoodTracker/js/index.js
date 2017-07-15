import React from 'react';
import ReactDOM from 'react-dom';
import WorldMoodTracker from './components/WorldMoodTracker.js';

export const host = 'http://api.loklak.org';

ReactDOM.render(
    <WorldMoodTracker/>,
    document.getElementById('app')
);
