import React from "react";
import cat1 from "../assets/images/ntuni-concerned.gif"
import "../assets/styles/AboutStyle.css"

function About() {

    return (
        <div className="about">
            <h1>Автор работы студент группы РПИС-91</h1>
            <h1>Фатхутдинов Аскар Фанисович</h1>
            <img src={cat1} alt="cat1" width="600"/>
        </div>
    )
}

export default About;