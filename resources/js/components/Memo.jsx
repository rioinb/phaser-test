/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { css, cx, jsx } from '@emotion/react'

function Memo() {

    const [memos, setMemos] = useState([]);
    useEffect(
        () => {
            axios
                .get('/memo')
                .then((response) => setMemos(response.data))
                .catch((error) => console.log(error))
        }, []);

    const [text, setText] = useState("");
    const handleTextChange = (e) => {
        setText(e.target.value);
        console.log(text);
    };

    const createNewMemo = () => {
        axios
            .post('/memo', {
                text: text
            })
            .then((response) => {
                setMemos([...memos, response.data]);
            })
            .then(() => {
                setText("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <button onClick={createNewMemo}>create memo</button>
                            </div>

                            <textarea value={text} onChange={handleTextChange} css={css`background-color: red;`} className="card-body"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            {
                memos.map( memo => {
                    return (
                        <div key={memo.id} className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header"></div>

                                        <textarea className="card-body" defaultValue={memo.text}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );

}
const flex = css`
        display: flex;
        justify-content: space-between;
    `


export default Memo;


