import {useEffect, useState} from "react";

export function useMovies(query, KEY, callback) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        callback?.()

        const controller = new AbortController();

        if (!query.length) {
            setMovies([]);
            setError('');
            return
        }

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

    return {movies, isLoading, error}
}