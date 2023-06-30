import React from "react";
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";

export default function SpotifyQueueTrack({track, deleteFromQueue, trackIndexInQueue}) {
    function handleDeleteQueue() {
        console.log("========== " + JSON.stringify(track));
        deleteFromQueue(trackIndexInQueue);
    }

    return (
        <div>
            <Card className="flex-row flex-wrap" style={{borderWidth: 0}}>
                <Card.Header style={{backgroundColor: "white"}}>
                    <Card.Img variant="top"
                              src={track.albumUrl}
                              style={{height: "48px", width: "48px"}}/>
                </Card.Header>
                <Card.Header style={{backgroundColor: "white"}}>
                    <Card.Title className="small">{track.title}</Card.Title>
                    <Button variant="danger"
                            onClick={handleDeleteQueue}
                            style={{fontSize: 11}}
                            size="sm">X</Button>
                </Card.Header>
            </Card>
        </div>
    );
}
