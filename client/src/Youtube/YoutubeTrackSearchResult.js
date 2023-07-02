import React from "react";
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";

export default function YoutubeTrackSearchResult({ track, chooseTrack, addToQueue }) {
    function handlePlayForSong() {
        //   console.log( "JJJJJJJJ" + JSON.stringify(track));
        chooseTrack(track);
    }

    function handleQueue() {
        console.log("--- yt: adding to queue " + JSON.stringify(track));
        addToQueue(track);
    }

    return (
        <div>
            <Card className="flex-row flex-wrap" style={{borderWidth: 0}}>
                <Card.Header style={{backgroundColor: "white"}}>
                    <Card.Img variant="top"
                              onClick={handlePlayForSong}
                              src={track.snippet.thumbnails.default.url}
                              style={{height: "64px", width: "64px", cursor: "pointer"}}/>
                </Card.Header>
                <Card.Header style={{backgroundColor: "white"}}>
                    <Card.Title className="small">{track.snippet.title}</Card.Title>
                    {/*<Card.Subtitle className="small text-muted">{track.artist}</Card.Subtitle>*/}
                    <Button variant="primary"
                            onClick={handleQueue}
                            style={{fontSize: 11}}
                            size="sm">Add To Queue</Button>

                </Card.Header>
            </Card>
        </div>
    );
}
