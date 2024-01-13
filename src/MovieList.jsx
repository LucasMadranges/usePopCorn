import Movie from "./Movie.jsx";

export default function MovieList({movies}) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie key={movie.imdbID}
                       movie={movie}/>
            ))}
        </ul>
    )
}