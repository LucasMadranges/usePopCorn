import {useState} from "react";
import Button from "./Button.jsx";
import Summary from "./Summary.jsx";
import WatchedMoviesList from "./WatchedMoviesList.jsx";

export default function WatchedBox({tempWatchedData}) {
    const [isOpen, setIsOpen] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <div className="box">
            <Button isOpen={isOpen}
                    setIsOpen={setIsOpen}/>
            {isOpen && (
                <>
                    <Summary watched={watched}/>
                    <WatchedMoviesList watched={watched}/>
                </>
            )}
        </div>
    )
}