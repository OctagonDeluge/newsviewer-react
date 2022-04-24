import React, {useEffect, useState} from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import "../assets/styles/NewsPageStyle.css"
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
    const [find, setFind] = useState(false);
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
    }, [count, mode, sort]);

    useEffect(() => {
        setSearch();
        setFind(false);
    }, [find])

    const setDefault = () => {
        if(!sort) {
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
        if (type === "title") {
            if(!sort) {
                axios
                    .get(
                        "https://api.spaceflightnewsapi.net/v3/articles?title_contains=" + keyWord +
                        "&_start=" + (count - 1) * 12 +
                        "&_limit=12"
                    )
                    .then((res) => {
                        setNews(res.data);
                    })

                axios
                    .get(
                        "https://api.spaceflightnewsapi.net/v3/articles?title_contains=" + keyWord +
                        "&_limit=-1"
                    )
                    .then(res => {
                        setTotalCount(res.data.length);
                    })
            } else {
                axios
                    .get(
                        "https://api.spaceflightnewsapi.net/v3/articles?title_contains=" + keyWord +
                        "&_start=" + (count - 1) * 12 +
                        "&_sort=publishedAt" +
                        "&_limit=12"
                    )
                    .then((res) => {
                        setNews(res.data);
                    })

                axios
                    .get(
                        "https://api.spaceflightnewsapi.net/v3/articles?title_contains=" + keyWord +
                        "&_sort=publishedAt" +
                        "&_limit=-1"
                    )
                    .then(res => {
                        setTotalCount(res.data.length);
                    })
            }
        } else {
            axios
                .get(
                    "https://api.spaceflightnewsapi.net/v3/articles?summary_contains=" + keyWord +
                    "&_start=" + (count - 1) * 12 +
                    "&_limit=12"
                )
                .then((res) => {
                    setNews(res.data);
                })

            axios
                .get(
                    "https://api.spaceflightnewsapi.net/v3/articles?summary_contains=" + keyWord +
                    "&_limit=-1"
                )
                .then(res => {
                    setTotalCount(res.data.length);
                })
        }
    }

    return (
        <div>
            <Header/>
            <div className="tools">
                <input type="image"
                       src="https://iconape.com/wp-content/png_logo_vector/sort-amount-up.png"
                       alt="sort_by_date"
                       onClick={() => {
                           if(!sort) {
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
                        <option hidden>Поиск по</option>
                        <option value="title">по заголовку</option>
                        <option value="summary">по описанию</option>
                    </select>
                    <input type="image"
                           src="https://iconape.com/wp-content/png_logo_vector/search-3.png"
                           alt='loupe'
                           onClick={() => {
                               setMode("search");
                               setFind(true);
                           }}
                    />
                </div>
            </div>
            <div className="center">
                <div className="news">
                    {
                        news.map(news => (
                            <NewsCard key={news.id} news={news}/>
                        ))
                    }
                </div>
            </div>
            <Pagination totalCount={totalCount} pageSize={12} currentPage={count} siblingCount={2} pageUrl={"/news/"}/>
        </div>

    )
}


export default News;