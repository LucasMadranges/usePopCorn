import Movie from "./Movie.jsx";

export default function MovieList({movies, onSelectedMovie}) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie key={movie.imdbID}
                       movie={movie}
                       onSelectedMovie={onSelectedMovie}/>
            ))}
        </ul>
    )
}