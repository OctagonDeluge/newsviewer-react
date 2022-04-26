import React from "react";
import "../assets/styles/NewsCardStyle.css"
import "../assets/mediaQuery/NewsCardMedia.css"
import {useNavigate, useParams} from "react-router-dom";

function NewsCard({news}) {
    let {count} = useParams();
    let date = new Date(news.publishedAt);
    const navigate = useNavigate();

    const handleClick = () => {
        //window.open('/news/'+ count + "/" + news.id);
        navigate('/news/'+ count + "/" + news.id);
    }

    return (
        <div className="card" onClick={handleClick}>
            <div className="container">
                <h4 >{news.title}</h4>
                <article>{news.summary}</article>
                <picture>
                    <img src={news.imageUrl} alt="pic"/>
                </picture>
                <time>{date.toLocaleString()}</time>
            </div>
        </div>
    )
}

export default NewsCard;