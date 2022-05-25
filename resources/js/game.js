/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

// const { default: Example } = require('./components/Example');

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Screen from './components/Screen';

function Game() {

    return (
        <>
            <Screen></Screen>
        </>
    )
}

export default Game;

if (document.getElementById('game')) {
    ReactDOM.render(<Game />, document.getElementById('game'));
}
