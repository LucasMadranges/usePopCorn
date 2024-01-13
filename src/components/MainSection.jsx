import ListBox from "./ListBox.jsx";
import WatchedBox from "./WatchedBox.jsx";

export default function MainSection({movies, tempWatchedData}) {

    return (
        <main className="main">
            <ListBox movies={movies}/>
            <WatchedBox tempWatchedData={tempWatchedData}/>
        </main>
    )
}