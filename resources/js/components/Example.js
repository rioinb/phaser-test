import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react'

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header" css={red}>Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );

}
const red = css `
    background-color: red !important;
`

export default Example;

// if (document.getElementById('example')) {
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }
