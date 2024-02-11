import React, {useState} from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {InputGroup} from "react-bootstrap";

const TrackSearch = ({user, sendMessage}) => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value.length > 2) {
            handleSubmit(e);
        }
    };

    function uuid() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    const handleAddToQueue = (e) => {
        e.preventDefault();
        // console.log("adding track: " + e.target.id + " to queue for room: " + user.room_id)
        const filteredTracks = results.filter(function (track) {
            return track.uri === e.target.id;
        });
        axios.post("http://localhost:3001/rooms/" + user.room_id + "/queue/add",
            {"track": filteredTracks[0], "user": user, "votes": 0, "timestamp": Date.now(), "uuid": uuid()},
            {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                console.log("track added!");
                sendMessage({
                    event_type: "track_added",
                    timestamp: Date.now(),
                    room_id: user.room_id,
                    user_name: user.name,
                    track_name: filteredTracks[0].title
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

    const handleClearSearch = (e) => {
        e.preventDefault();
        setResults([]);
        setQuery("");
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3" size="sm">
                    <Form.Control type="text"
                                  placeholder="Track or artist"
                                  value={query}
                                  onChange={handleChange}/>
                    <Button variant="primary" type="submit">Search</Button>
                    <Button variant="danger" onClick={handleClearSearch}>Clear</Button>
                </InputGroup>
            </Form>

            <Stack direction="vertical" gap={1} className="justify-content-center">
                {results && results.map((track) => (
                    <Card key={track.uri} className="flex-row flex-wrap" style={{borderWidth: 1, fontSize: '0.85em'}}>
                        <Card.Header style={{borderWidth: 0}}>
                            <Card.Img variant="top"
                                      src={track.albumUrl}
                                      style={{height: "48px", width: "48px", cursor: "pointer"}}/>
                        </Card.Header>
                        <Card.Header style={{backgroundColor: "white", borderWidth: 0}}>
                            <Card.Title className="small">{track.title}</Card.Title>
                            <Card.Subtitle
                                className="mb-2 small text-muted">{track.artist}</Card.Subtitle>
                            <Button variant="success" size="sm" id={track.uri} onClick={handleAddToQueue}>
                                Add to Playlist
                            </Button>
                        </Card.Header>
                    </Card>
                ))}
            </Stack>
        </>
    );
};
export default TrackSearch;
