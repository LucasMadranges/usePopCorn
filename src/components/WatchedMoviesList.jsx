import WatchedMovie from "./WatchedMovie.jsx";

export default function WatchedMoviesList({watched, onDeleteWatched}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID}
                              movie={movie}
                              onDeleteWatched={onDeleteWatched}/>
            ))}
        </ul>
    )
}