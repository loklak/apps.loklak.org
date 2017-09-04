import React from 'react';
import ReactDOM from 'react-dom';
import WorldMoodTracker from './components/WorldMoodTracker.js';

export const host = 'http://162.222.180.38';

ReactDOM.render(
    <WorldMoodTracker/>,
    document.getElementById('app')
);
