import React, { useState } from 'react'
import './style.scss'
import axios from 'axios'
import api from '../../../api'
import { Icon } from 'react-icons-kit'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { androidSearch } from 'react-icons-kit/ionicons'

import Loader from '../../Loader'
import testImg from '../../../assets/cover.jpg';


const SearchSong = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm();
    const [suggestBox, setSuggestBox] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [results, setResults] = useState([]);

    // Submit Search
    const onSubmit = data => {
        history.push(`/search-results?query=${data.filterdata}`)
    }

    // on Change filter
    const onChnageSearch = event => {
        if (event.target.value) {
            setSuggestBox(true)
            setIsSearchLoading(true)
            axios.get(`${api}comments?postId=${event.target.value}`)
                .then(res => {
                    if (res.data) {
                        setResults(res.data)
                        setSuggestBox(true)
                        setIsSearchLoading(false)
                    }
                })
                .catch(err => {
                    if (err) {
                        console.log(err.response)
                    }
                })
        } else {
            setSuggestBox(false)
            setIsSearchLoading(false)
        }
    }

    const handleClick = data => {
        history.push(`/search-results?query=${data}`)
    }


    return (
        <div className="search-container">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8 m-auto">
                        <div className="card border-0">
                            <div className="card-body">

                                <p className="mb-0 text-unique">Find your favourite music</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="d-flex">
                                        <div className="flex-grow-1 pr-2">
                                            <input
                                                name="filterdata"
                                                type="text"
                                                onChange={onChnageSearch}
                                                className={errors.filterdata ? "form-control shadow-none error" : "form-control shadow-none"}
                                                placeholder="Search for music ( e.g. Music title )"
                                                ref={register({
                                                    required: true
                                                })}
                                            />

                                            {/* Suggest container */}
                                            {suggestBox ? (
                                                <div className="suggest-container shadow-sm">
                                                    {isSearchLoading ? (
                                                        <div className="text-center">
                                                            <Loader />
                                                        </div>
                                                    ) : null}

                                                    {results && results.length > 0 ? (results.map((result) =>
                                                        <div className="result border-bottom"
                                                            key={result.id}
                                                            onClick={() => handleClick(result.name)}
                                                        >

                                                            <div className="d-flex">
                                                                <div className="pl-2">
                                                                    <img src={testImg} className="rounded-circle" alt="..." />
                                                                </div>
                                                                <div className="pl-2"><p className="mb-0 pl-0">{result.name}</p></div>
                                                            </div>

                                                        </div>
                                                    )) :
                                                        <div className="py-3">
                                                            <p className="mb-0 text-unique">0 Song or Album found.</p>
                                                        </div>
                                                    }
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <button type="submit" className="btn shadow btn-search rounded-circle">
                                                <Icon icon={androidSearch} size={30} />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSong;