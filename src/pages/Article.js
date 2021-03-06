import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "../assets/styles/ArticleStyle.css"
import "../assets/mediaQuery/ArticleMedia.css"
import Suggestion from "../components/Suggestion";
import Header from "../components/Header";

function Article() {
    let temp = [];
    let test = [];
    let {id} = useParams();
    const [article, setArticle] = useState({
        id: "",
        title: "",
        summary: "",
        imageUrl: "",
        url: ""
    });
    const [news, setNews] = useState([]);

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("bookmarks")).includes(Number(id)))
        axios
            .get("https://api.spaceflightnewsapi.net/v3/articles/" + id)
            .then((res) => {
                setArticle(res.data);
            })
    }, [id])

    useEffect(() => {
        const words = article.title.split(' ', 3);
        axios
            .get(
                "https://api.spaceflightnewsapi.net/v3/articles?title_contains=" + words[0] +
                "&title_contains=" + words[1] +
                "&title_contains=" + words[2] +
                "&_limit=4" +
                "&_start=1"
            )
            .then((res) => {
                setNews(res.data);
            })
    }, [article])

    const handleClick = () => {
        debugger;
        if (localStorage.getItem("bookmarks") === null) {
            temp.push(Number(id));
            localStorage.setItem("bookmarks", JSON.stringify(temp));
        } else {
            temp = JSON.parse(localStorage.getItem("bookmarks"));
            if (!temp.includes(Number(id))) {
                temp.push(Number(id));
                localStorage.setItem("bookmarks", JSON.stringify(temp));
            } else {
                temp.splice(temp.indexOf(Number(id)), 1);
                localStorage.setItem("bookmarks", JSON.stringify(temp));
                alert("Закладка удалена");
            }
        }
    }

    return (
        <div className="article">
            <Header/>
            <div className="article-container">
                <div className="subArticle">
                    <h1>{article.title}</h1>
                    <article>{article.summary}</article>
                    <img src={article.imageUrl} alt="newsImage"/>
                    {
                        JSON.parse(localStorage.getItem("bookmarks")).includes(Number(id)) ? console.log(1) : console.log(2)
                    }
                    <button onClick={handleClick}>Add to bookmarks</button>
                    <a href={article.url}>Source</a>
                </div>
                <div className="suggestions">
                    {
                        news.map(news => (
                            <Suggestion key={news.id} suggestion={news}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Article;