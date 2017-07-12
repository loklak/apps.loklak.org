import React from 'react';
import ReactDOM from 'react-dom';
import WorldMoodTracker from './components/WorldMoodTracker.js';

export const host = 'http://35.192.111.68';

ReactDOM.render(
    <WorldMoodTracker/>,
    document.getElementById('app')
);
