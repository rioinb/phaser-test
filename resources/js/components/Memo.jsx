/** @jsxImportSource @emotion/react */
'use strict';
import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { css, cx, jsx } from '@emotion/react'
import { useCategoryContext } from '../contexts/CategoryContext';
import axios from 'axios';

function Memo() {
    const { selectedCategory, setSelectedCategory } = useCategoryContext();

    const [memos, setMemos] = useState([]);
    useEffect(
        () => {
            axios
                .get('/memo/' + selectedCategory)
                .then((response) => setMemos(response.data))
                .catch((error) => console.log(error))
        }
        , [selectedCategory]);

    const [text, setText] = useState("");
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const createNewMemo = () => {
        axios
            .post('/memo', {
                text: text,
                category_id: selectedCategory
            })
            .then((response) => {
                setMemos([response.data, ...memos]);
            })
            .then(() => {
                setText("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [editedText, setEditedText] = useState("")
    const [editedTextKey, setEditedTextKey] = useState("")

    const editMemo = (e) => {
        setEditedText(e.target.value);
        setEditedTextKey(e.target.name);
    }

    const updateMemo = () => {
        axios
            .put('/memo', {
                id: editedTextKey,
                text: editedText
            })
            .then(() => {
                setEditedText("");
                setEditedTextKey("");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteMemo = (e) => {
        const id = e.target.name
        axios
            .delete('/memo/' + id, {
                id: id
            })
            .then(() => {
                const m = memos.filter((memo) => {
                    return memo.id.toString() !== id
                })
                setMemos(m);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleCopy = (memo) => {
        navigator.clipboard.writeText(memo)
    }

    return (
        <>
            <div className='' css={css`flex: 6;`}>
                <div className=" mb-2">
                    <div className="row">
                        <div className="">
                            <div className="card">
                                <div className="card-header">
                                    <button className='btn-primary border-0' onClick={createNewMemo} disabled={!selectedCategory}>create memo</button>
                                </div>
                                <TextareaAutosize css={css`resize: none;`} value={text} onChange={handleTextChange} className="card-body" autoFocus />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {
                    memos.map(memo => {
                        return (
                            <div key={memo.id} className=" mb-2">
                                <div className="row ">
                                    <div className="">
                                        <div className="card">
                                            <div className="card-header" css={css`justify-content: space-between; display: flex;`}>
                                                <button onClick={updateMemo} disabled={editedTextKey !== memo.id.toString()} className="border-0">update memo</button>
                                                <div>
                                                    <button onClick={deleteMemo} name={memo.id} className="border-0">
                                                        <FontAwesomeIcon css={css`pointer-events: none;`} icon={faTrashCan} />
                                                    </button>
                                                    <button onClick={() => handleCopy(memo.text)} className="border-0" css={css`margin-left: 0.5rem;`}>
                                                        <FontAwesomeIcon icon={faCopy} />
                                                    </button>
                                                </div>
                                            </div>
                                            <TextareaAutosize css={css`resize: none;`} className="card-body" defaultValue={memo.text} name={memo.id} onChange={editMemo} disabled={editedText && editedTextKey !== memo.id.toString()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );

}
const flex = css`
        display: flex;
        justify-content: space-between;
    `


export default Memo;


