import React from "react"
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";

const Queue = ({queue, clearQueue, deleteFromQueue, user}) => {

    if (queue !== null) {
        return (
            <>
            <Button onClick={clearQueue}>Clear Queue</Button>
            <Stack direction="vertical" gap={1} className="justify-content-center">
                {queue.tracks.map((queueTrack) => (
                    <Card key={queueTrack.track.uri} className="flex-row flex-wrap" style={{borderWidth: 1}}>
                        <Card.Header style={{borderWidth: 0}}>
                            <Card.Img variant="top"
                                      src={queueTrack.track.albumUrl}
                                      style={{height: "64px", width: "64px", cursor: "pointer"}}/>
                        </Card.Header>
                        <Card.Header style={{backgroundColor: "white", borderWidth: 0}}>
                            <Card.Title className="small">{queueTrack.track.title}</Card.Title>
                            <Card.Subtitle
                                className="mb-2 small text-muted">{queueTrack.track.artist}</Card.Subtitle>
                            <Card.Text className="small">Added by {queueTrack.user.name} </Card.Text>
                        </Card.Header>
                        <Card.Header style={{backgroundColor: "white", borderWidth: 0}}>
                            <Button variant="danger"
                                    disabled={user.role !== "host" && queueTrack.user.id !== user.id}
                                    onClick={() => deleteFromQueue(queueTrack)}
                                    size="sm">X</Button>
                        </Card.Header>
                    </Card>
                ))}
            </Stack>
            </>
        );
    }
};

export default Queue;
