import React, {useEffect, useState} from "react"
import QueueTrack from "./QueueTrack";
import {Button} from "react-bootstrap";

export default function Queue({newQueueResults, clearQ, deleteFromQueue}) {
    // console.log(accessToken)
    const [queueResults, setQueueResults] = useState([])

    useEffect(() => {
        setQueueResults(newQueueResults);
    }, [newQueueResults])


    return (
        <div>
            <h1>Queue</h1>
            {/*{ JSON.stringify(  queueResults)}*/}
            <Button variant="danger"
                    onClick={clearQ}
                    style={{fontSize: 13}}
                    size="lg">Clear Queue</Button>

            {queueResults.map((track) => (



                <div key={track.uri}>
                    <QueueTrack track={track}
                                deleteFromQueue={deleteFromQueue}
                                trackIndexInQueue={newQueueResults.indexOf(track)}/>
                </div>




            ))
            }
        </div>
    )
}
