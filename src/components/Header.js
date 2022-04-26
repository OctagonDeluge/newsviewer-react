import React from "react";
import {Link} from "react-router-dom";
import "../assets/styles/HeaderStyle.css"
import "../assets/mediaQuery/HeaderMedia.css"

function Header() {

    return (
        <div className="header">
            <img src="https://www.svgrepo.com/show/246172/space.svg" alt="svgPic"/>
            <Link to="/news/1">Home</Link>
            <Link to="/bookmarks/1">Bookmarks</Link>
            <Link to="/about">About</Link>
        </div>
    )
}

export default Header;