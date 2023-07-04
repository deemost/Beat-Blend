import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";

export default function QueueTrack({track, deleteFromQueue, trackIndexInQueue}) {
    function handleDeleteQueue() {
        console.log("========== " + JSON.stringify(track));
        deleteFromQueue(trackIndexInQueue);

    }

    let albumCover;
    let trackTitle;

    if(track?.uri){
        albumCover = track.albumUrl;
        trackTitle = track.title;
    }
    else{
        albumCover = track.snippet.thumbnails.default.url;
        trackTitle = track.snippet.title;
    }



    return (


        <div>
            <Card className="flex-row flex-wrap" style={{borderWidth: 0}}>
                <Card.Header style={{backgroundColor: "white"}}>
                    <Card.Img variant="top"
                              src={albumCover}
                              style={{height: "48px", width: "48px"}}/>
                </Card.Header>
                <Card.Header style={{backgroundColor: "white"}}>
                    <Card.Title className="small">{trackTitle}</Card.Title>
                    <Button variant="danger"
                            onClick={handleDeleteQueue}
                            style={{fontSize: 11}}
                            size="sm">X</Button>
                </Card.Header>
            </Card>
        </div>

    );
}
