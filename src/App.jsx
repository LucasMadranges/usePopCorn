import {useEffect, useState} from "react";
import Navigation from "./components/Navigation.jsx";
import MainSection from "./components/MainSection.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NumResults from "./components/NumResults.jsx";
import Box from "./components/Box.jsx";
import MovieList from "./components/MovieList.jsx";
import Summary from "./components/Summary.jsx";
import WatchedMoviesList from "./components/WatchedMoviesList.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import SelectedMovie from "./components/SelectedMovie.jsx";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const KEY = '3b574e2b';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const [selectedId, setSelectedId] = useState(null);

    function handleSelectMovie(id) {
        setSelectedId(selectedId => id === selectedId ? null : id);
    }

    function handleCloseMovie() {
        setSelectedId(null)
    }

    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    }

    useEffect(() => {
        const controller = new AbortController();

        if (!query.length) {
            setMovies([]);
            setError('');
            return
        }

        handleCloseMovie()
        DataMovies(controller);

        return function () {
            controller.abort();
        }
    }, [query])

    async function DataMovies(controller) {
        try {
            setIsLoading(true);
            setError('')

            const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, {signal: controller.signal});
            if (!resp.ok) throw new Error(`Something went wrong with fetching movies: ${error}`)

            const data = await resp.json();
            if (data.Response === 'False') throw new Error("Movie not found");

            setMovies(data.Search)
            setError("");
        } catch (error) {
            if (error.name !== "AbortError") {
                setError(error.message);
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Navigation>
                <SearchBar query={query}
                           setQuery={setQuery}/>
                <NumResults movies={movies}/>
            </Navigation>

            <MainSection>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies}
                                                        onSelectedMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>

                <Box>
                    {selectedId ? (
                            <SelectedMovie selectedId={selectedId}
                                           onCloseMovie={handleCloseMovie}
                                           onAddWatched={handleAddWatched}
                                           watched={watched}
                                           KEY={KEY}/>
                        )
                        : (
                            <>
                                <Summary watched={watched}/>
                                <WatchedMoviesList watched={watched}
                                                   onDeleteWatched={handleDeleteWatched}/>
                            </>
                        )}
                </Box>
            </MainSection>
        </>
    );
}
