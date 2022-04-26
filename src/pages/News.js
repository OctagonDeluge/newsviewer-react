import React, {useEffect, useState} from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import "../assets/styles/NewsPageStyle.css"
import "../assets/mediaQuery/NewsPageMedia.css"
import {useParams} from "react-router-dom";
import Pagination from "../components/Pagination";
import Header from "../components/Header";

function News() {
    let {count} = useParams();
    const [news, setNews] = useState([]);
    const [keyWord, setKeyWord] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [mode, setMode] = useState("default");
    const [sort, setSort] = useState(false);
    const [type, setType] = useState("title");

    useEffect(() => {
        switch (mode) {
            case "search":
                setSearch()
                break;
            default:
                setDefault()
                break;
        }
    }, [count, sort]);

    const setDefault = () => {
        if (!sort) {
            axios
                .get("https://api.spaceflightnewsapi.net/v3/articles?_limit=12" +
                    "&_start=" + (count - 1) * 12)
                .then(res => {
                    setNews(res.data);
                })

            axios
                .get("https://api.spaceflightnewsapi.net/v3/articles/count")
                .then(res => {
                    setTotalCount(res.data)
                })
        } else {
            axios
                .get("https://api.spaceflightnewsapi.net/v3/articles?_limit=12" +
                    "&_start=" + (count - 1) * 12 +
                    "&_sort=publishedAt")
                .then(res => {
                    setNews(res.data);
                })
        }
    }

    const setSearch = () => {
        const searchStr = type === "title" ? 'title_contains' : 'summary_contains';
        const sortStr = sort ? "&_sort=publishedAt" : "";
        //console.log(`https://api.spaceflightnewsapi.net/v3/articles?${searchStr}=${keyWord}${sortStr}&_start=${(count - 1) * 12}&_limit=12`);
        axios
            .get(
                `https://api.spaceflightnewsapi.net/v3/articles?${searchStr}=${keyWord}${sortStr}&_start=${(count - 1) * 12}&_limit=12`
            )
            .then((res) => {
                setNews(res.data);
            })

        axios
            .get(`https://api.spaceflightnewsapi.net/v3/articles/count?${searchStr}=${keyWord}`)
            .then((res) => {
                setTotalCount(res.data);
            })
}

return (
    <div>
        <Header/>
        <div className="tools">
            <input type="image"
                   src="https://iconape.com/wp-content/png_logo_vector/sort-amount-up.png"
                   alt="sort_by_date"
                   onClick={() => {
                       if (!sort) {
                           setSort(true)
                       } else {
                           setSort(false);
                       }
                   }}
            />
            <div className="search">
                <input placeholder="Search" type="text" value={keyWord} onChange={event => {
                    setKeyWord(event.target.value)
                }}/>
                <select
                    onChange={(event) => setType(event.target.value)}
                    value={type}
                >
                    <option hidden>Search</option>
                    <option value="title">by title</option>
                    <option value="summary">by summary</option>
                </select>
                <input type="image"
                       src="https://iconape.com/wp-content/png_logo_vector/search-3.png"
                       alt='loupe'
                       onClick={() => {
                           setMode("search");
                           setSearch();
                       }}
                />
            </div>
        </div>
        <div className="news">
            {
                news.map(news => (
                    <NewsCard key={news.id} news={news}/>
                ))
            }
        </div>
        <Pagination totalCount={totalCount} pageSize={12} currentPage={count} siblingCount={2} pageUrl={"/news/"}/>
    </div>

)
}


export default News;