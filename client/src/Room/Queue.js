import React from "react"
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

const Queue = ({queue}) => {
    if (queue !== null) {
        return (
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
                                className="mb-2 small text-muted">by {queueTrack.track.artist}</Card.Subtitle>
                            <Card.Text className="small">Added by {queueTrack.user.name}</Card.Text>
                        </Card.Header>
                    </Card>
                ))}
            </Stack>
        );
    }
};

export default Queue;
