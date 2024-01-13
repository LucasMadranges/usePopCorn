import {useState} from "react";
import MovieList from "./MovieList.jsx";
import Button from "./Button.jsx";

export default function ListBox({movies}) {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <div className="box">
            <Button isOpen={isOpen}
                    setIsOpen={setIsOpen}/>
            {isOpen && (
                <MovieList movies={movies}/>
            )}
        </div>
    )
}