/** @jsxImportSource @emotion/react */
'use strict';
import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandPointer, faTrashCan} from '@fortawesome/free-regular-svg-icons'
import { css, cx, jsx } from '@emotion/react'
import { useCategoryContext } from '../contexts/CategoryContext';
import axios from 'axios';

function Category() {
    const {category, setCategory} = useCategoryContext();

    const [categories, setCategories] = useState([]);
    useEffect(
        () => {
                axios
                    .get('/category')
                    .then((response) => setCategories(response.data))
                    .catch((error) => console.log(error))
            }
        , []);

    const [name, setName] = useState("");
    const handleTextChange = (e) => {
        setName(e.target.value);
    };

    const createNewCategory = () => {
        axios
            .post('/category', {
                name: name
            })
            .then((response) => {
                setCategories([response.data, ...categories]);
            })
            .then(() => {
                setName("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [editedName, setEditedName] = useState("")
    const [editedNameKey, setEditedNameKey] = useState("")

    const editCategory = (e) => {
        setEditedName(e.target.value);
        setEditedNameKey(e.target.name);
    }

    const updateCategory = () => {
        axios
            .put('/category', {
                id: editedNameKey,
                name: editedName
            })
            .then(() => {
                setEditedName("");
                setEditedNameKey("");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteCategory = (e) => {
        const id = e.target.name
        axios
            .delete('/category/'+id, {
                id: id
            })
            .then(() => {
                const m = categories.filter((category)=> {
                    return category.id.toString()!==id
                })
                setCategories(m);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className='container'>
                <div className=" mb-2">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <button className='btn-primary' onClick={createNewCategory} className="border-0">create CATEGORY</button>
                                </div>
                                <TextareaAutosize css={css`resize: none;`} value={name} onChange={handleTextChange} className="card-body" autoFocus />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {
                    categories.map( category => {
                        return (
                            <div key={category.id} className="container mb-2">
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header" css={css`justify-content: space-between; display: flex;`}>
                                                <button onClick={updateCategory}
                                                    disabled={editedNameKey !== category.id.toString()}
                                                    className="border-0">update category</button>
                                                <div>
                                                    <button onClick={() => setCategory(category.id)} name={category.id} className="border-0">
                                                        <FontAwesomeIcon css={css`pointer-events: none;`} icon={faHandPointer} />
                                                    </button>
                                                    <button onClick={deleteCategory} name={category.id} className="border-0" css={css`margin-left: 0.5rem;`}>
                                                        <FontAwesomeIcon css={css`pointer-events: none;`} icon={faTrashCan} />
                                                    </button>
                                                </div>
                                            </div>
                                            <TextareaAutosize
                                                css={css`resize: none;`}
                                                className="card-body"
                                                defaultValue={category.name}
                                                name={category.id}
                                                onChange={editCategory}
                                                disabled={editedName && editedNameKey !== category.id.toString()}
                                                />
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


export default Category;


