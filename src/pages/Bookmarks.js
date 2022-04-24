import React, {useEffect, useState} from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import "../assets/styles/BookmarksPageStyle.css"
import Pagination from "../components/Pagination";
import {Link, useParams} from "react-router-dom";

function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    let {page} = useParams();
    const qs = require("qs")
    const query = qs.stringify({
        id: {
            _in: JSON.parse(localStorage.getItem("bookmarks")),
        },
    }, {
        encodeValuesOnly: true,
        indices: false,
        allowDots: true
    });

    useEffect(() => {
        axios
            .get("https://api.spaceflightnewsapi.net/v3/articles?" + query.replaceAll('.', '')
                + "&_limit=12&_start=" + (page - 1) * 12)
            .then(res => {
                setBookmarks(res.data);
            })
        axios
            .get("https://api.spaceflightnewsapi.net/v3/articles?" + query.replaceAll('.', ''))
            .then(res => {
                setTotalCount(res.data.length);
            })
    }, [page])

    return (
        <div>
            <div className="bookmarks">
                <div className="bookmarks-header">
                    <img src="https://www.svgrepo.com/show/246172/space.svg" alt="svgPic"/>
                    <Link to="/news/1">Home</Link>
                    <Link to="/about">About</Link>
                </div>
                <div className="bookmarks-container">
                    {
                        bookmarks.map((bookmark) => (
                            <NewsCard key={bookmark.id} news={bookmark}/>
                        ))
                    }
                </div>
            </div>
            <Pagination totalCount={totalCount}
                        pageSize={12}
                        currentPage={page}
                        siblingCount={1}
                        pageUrl={"/bookmarks/"}/>
        </div>
    )
}

export default Bookmarks;