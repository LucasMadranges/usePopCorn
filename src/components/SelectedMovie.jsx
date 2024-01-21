import {useEffect, useRef, useState} from "react";
import StarRating from "./StarRating.jsx";
import Loader from "./Loader.jsx";

export default function SelectedMovie({selectedId, onCloseMovie, onAddWatched, watched, KEY}) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userRating, setUserRating] = useState('');

    const countRef = useRef(0);

    useEffect(() => {
        if (userRating) countRef.current = countRef.current + 1;
    }, [userRating]);

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                onCloseMovie();
            }
        })

        return function () {
            document.removeEventListener("keydown", onCloseMovie);
        }
    }, [onCloseMovie])

    async function getMovieDetails() {
        const resp = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        setError('')
        if (!resp.ok) throw new Error(`Something went wrong with fetching movies: ${error}`)

        const data = await resp.json();
        if (data.Response === 'False') throw new Error("Movie not found");

        setMovie(data);
        setIsLoading(false);
    }

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: runtime.split(' ').at(0),
            userRating,
            countRatingDecisions: countRef.current,
        }

        onAddWatched(newWatchedMovie)
        onCloseMovie();
    }

    useEffect(() => {
        setIsLoading(true);
        getMovieDetails();
    }, [selectedId])

    useEffect(() => {
        if (!title) return;
        document.title = `🍿 UsePopCorn | ${title}`;

        return function () {
            document.title = "🍿 UsePopCorn";
        }
    }, [title])

    return (
        <div className="details">
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back"
                                onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster}
                             alt={`Poster of ${movie}`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐️</span> {imdbRating} Rating</p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isWatched ?
                                <>
                                    <StarRating size={22}
                                                maxRating={10}
                                                userRating={userRating}
                                                onSetRating={setUserRating}/>
                                    {
                                        userRating > 0 && <button className="btn-add"
                                                                  onClick={handleAdd}>+ Add to list
                                        </button>

                                    }
                                </>
                                : <p>You already rated this movie ({watchedUserRating} <span>⭐️</span>)!</p>}
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Actors: {actors}</p>
                        <p>Directed by: {director}</p>
                    </section>
                </>
            }
        </div>
    )
}