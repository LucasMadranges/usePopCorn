import WatchedMovie from "./WatchedMovie.jsx";

export default function WatchedMoviesList({watched}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID}
                              movie={movie}/>
            ))}
        </ul>
    )
}