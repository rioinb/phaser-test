import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react'

function Memo() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <textarea className="card-body">test</textarea>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Memo;


