import {useState, useEffect} from "react"
// import SpotifyPlayer from "react-spotify-web-playback"
import {spotifyApi} from 'react-spotify-web-playback';
import SpotifyQueueTrack from "./Spotify/SpotifyQueueTrack";
// import getQueue from "react-spotify-web-playback"

export default function Queue({newQueueResults, clearQ, deleteFromQueue}) {
    // console.log(accessToken)
    const [queueResults, setQueueResults] = useState([])

    useEffect(() => {

        setQueueResults(newQueueResults);

    }, [newQueueResults])


    function clearQueue() {

        clearQ();

    }

    return (
        <div>
            <h1>QUEUE:</h1>
            {/*{ JSON.stringify(  queueResults)}*/}

            <button onClick={clearQueue}>Clear Queue</button>

            {queueResults.map((track) => (

                <div key={track.uri}>
                    <SpotifyQueueTrack track={track} deleteFromQueue={deleteFromQueue} trackIndexInQueue={newQueueResults.indexOf(track)}></SpotifyQueueTrack>
                </div>
                ))}


        </div>

    )
}
