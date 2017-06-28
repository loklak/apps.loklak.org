import React from 'react';
import ReactDOM from 'react-dom';
import WorldMoodTracker from './components/WorldMoodTracker.js';

export const host = 'http://104.154.80.218';

ReactDOM.render(
    <WorldMoodTracker/>,
    document.getElementById('app')
);
