import React from "react";
import "../assets/styles/SuggestionStyle.css"
import "../assets/mediaQuery/SuggestionMedia.css"
import {useNavigate, useParams} from "react-router-dom";

function Suggestion({suggestion}) {
    const navigate = useNavigate();
    let {count} = useParams();

    const handleClick = () => {
        navigate('/news/' + count + "/" + suggestion.id)
    }

    return (
        <div onClick={handleClick} className="suggestion">
            <div className="suggestion-container">
                <h4>{suggestion.title}</h4>
                <article>{suggestion.summary}</article>
            </div>
        </div>
    )
}

export default Suggestion;