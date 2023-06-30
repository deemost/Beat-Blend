import React, {useEffect, useState} from "react"
// import SpotifyPlayer from "react-spotify-web-playback"
import SpotifyQueueTrack from "./Spotify/SpotifyQueueTrack";
import {Button} from "react-bootstrap";
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
            <h1>Queue</h1>
            {/*{ JSON.stringify(  queueResults)}*/}
            <Button variant="danger"
                    onClick={clearQueue}
                    style={{fontSize: 13}}
                    size="lg">Clear Queue</Button>

            {queueResults.map((track) => (
                <div key={track.uri}>
                    <SpotifyQueueTrack track={track}
                                       deleteFromQueue={deleteFromQueue}
                                       trackIndexInQueue={newQueueResults.indexOf(track)}/>
                </div>
            ))
            }
        </div>

    )
}
