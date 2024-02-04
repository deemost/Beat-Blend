import {useState} from "react";
import axios from "axios";

const TrackSearch = ({user, sendMessage}) => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState("")

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleAddToQueue = (e) => {
        e.preventDefault();
        // console.log("adding track: " + e.target.id + " to queue for room: " + user.room_id)
        const filteredTracks = results.filter(function (track) {
            return track.uri === e.target.id;
        });
        axios.post("http://localhost:3001/rooms/" + user.room_id + "/queue/add",
            {"track": filteredTracks[0], "user": user},
            {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                console.log("track added!");
                sendMessage({
                    event_type: "track_added",
                    timestamp: Date.now(),
                    room_id: user.room_id,
                    user_name: user.name
                })
            });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("track search query before submit: " + query);
        axios.post("http://localhost:3001/spotify/search", {"query": query, "limit": 20},
            {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                // console.log(JSON.stringify(res.data));
                setResults(res.data)
            });
    };

    return (
        <>
            <h3>Search</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" value={query} onChange={handleChange}/>
                </label>
                <button>Search</button>
            </form>

            <ul>
                {results && results.map((track) => (
                    <li key={track.uri}>
                        {track.title} ({track.artist})
                        <img src={track.albumUrl} height="40" alt={track.title}/>
                        <a id={track.uri} onClick={handleAddToQueue}>add to queue</a>
                    </li>
                ))}
            </ul>
        </>
    );
};
export default TrackSearch;
