import {useState} from "react";
import SearchBar from "./SearchBar.jsx";
import Logo from "./Logo.jsx";

export default function Navigation({movies}) {
    return (
        <nav className="nav-bar">
            <Logo />
            <SearchBar />
            <p className="num-results">
                Found <strong>{movies.length}</strong> results
            </p>
        </nav>
    )
}