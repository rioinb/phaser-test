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


import * as React from 'react';
import ReactDOM from 'react-dom';
import { CategoryProvider } from './contexts/CategoryContext';
import Memo from './components/Memo';
import Category from './components/Category';

function App() {
    return (
        <>
            <CategoryProvider>
                <div className='d-flex'>
                    <Category />
                    <Memo />
                </div>
            </CategoryProvider>
        </>
    )
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
