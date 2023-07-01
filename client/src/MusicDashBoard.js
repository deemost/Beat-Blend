import React, {useEffect, useState} from "react";
import CustomSpotifyPlayer from "./Spotify/CustomSpotifyPlayer";
import axios from "axios";
import {Container, Navbar} from "react-bootstrap";
import SpotifySearch from "./Spotify/SpotifySearch";
import YoutubeSearch from "./Youtube/YoutubeSearch";
import Queue from "./Queue";
import Nav from 'react-bootstrap/Nav';


export default function MusicDashBoard() {

    const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
    const [youtubeAccessToken, setYoutubeAccessToken] = useState("");
    const [whichService, setWhichService] = useState("");
    const [playingTrack, setPlayingTrack] = useState();
    const [queueResults, setQueueResults] = useState([]);

    useEffect(() => {


        axios
            .get("http://localhost:3001/queue/playingtrack")
            .then((res) => {
                setPlayingTrack(res.data.playingTrack);
            });

        axios
            .get("http://localhost:3001/callback/spotify/access")
            .then((res) => {
                setSpotifyAccessToken(res.data.access_token);
            });

        axios
            .get("http://localhost:3001/callback/youtube/access")
            .then((res) => {
                setYoutubeAccessToken(res.data.access_token);
            });

        axios
            .get("http://localhost:3001/queue")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });


        console.log("access token: " + spotifyAccessToken);


    }, []);


    function playNextInQueue() {
        axios
            .get("http://localhost:3001/queue")
            .then((res) => {
                setQueueResults(res.data.queueResults);
                // console.log("QUEUE: " + res.data.queueResults.length)
            });

        console.log("QUEUE: " + queueResults.length);

        // let nextInQueue = queueResults[0];

        axios
            .post("http://localhost:3001/queue/playingtrack", {
                track: (queueResults[0])
            })
            .then((res) => {
                setPlayingTrack(res.data.playingTrack);
            });

        axios
            .delete("http://localhost:3001/queue/specific")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }


    const handleButtonsClick = (str) => () => {
        setWhichService(str);

        if (str === "Spotify" && !spotifyAccessToken) {
            window.location.replace('http://localhost:3001/login/spotify');
        }

        if (str === "Youtube" && !youtubeAccessToken) {
            window.location.replace('http://localhost:3001/login/youtube');
        }

        if (str === "Logout") {
            axios
                .post("http://localhost:3001/callback/spotify/access", {
                    undefined
                })
                .then((res) => {
                    setSpotifyAccessToken(res.data.access_token);
                });

            axios
                .post("http://localhost:3001/callback/youtube/access", {
                    undefined
                })
                .then((res) => {
                    setYoutubeAccessToken(res.data.access_token);
                });
        }
    };


    function chooseTrack(track) {

        // setPlayingTrack(track);

        axios
            .post("http://localhost:3001/queue/playingtrack", {
                track
            })
            .then((res) => {
                setPlayingTrack(res.data.playingTrack);
            });
    }

    function addToQueue(track) {
        axios
            .post("http://localhost:3001/queue", {
                track
            })
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }

    function clearQueue() {
        axios
            .delete("http://localhost:3001/queue/all")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }


    function deleteFromQueue(trackIndexInQueue) {

        axios
            .delete("http://localhost:3001/queue/specific", {
                params: {
                    trackIndexInQueue: trackIndexInQueue,
                },
            })
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });

    }


    return (
        <div>

            <div className="row" style={{backgroundColor: 'white'}}>
                <Navbar expand="sm" variant="light">
                    <Container>
                        <Navbar.Toggle/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link onClick={handleButtonsClick("Spotify")}
                                              className='btn btn-success btn-sm'
                                              style={{color: 'white'}}>Spotify</Nav.Link>
                                </Nav.Item>
                                <div>&nbsp;</div>
                                <Nav.Item>
                                    <Nav.Link onClick={handleButtonsClick("Youtube")}
                                              className='btn btn-danger btn-sm'
                                              style={{color: 'white'}}>YouTube</Nav.Link>
                                </Nav.Item>
                                <div>&nbsp;</div>
                                <Nav.Item>
                                    <Nav.Link eventKey="disabled" disabled
                                              className='btn btn-info btn-sm'
                                              style={{color: 'white'}}>Apple Music</Nav.Link>
                                </Nav.Item>
                                <div>&nbsp;</div>
                                <Nav.Item>
                                    <Nav.Link onClick={handleButtonsClick("Logout")}
                                              className='btn btn-light btn-sm'
                                              style={{color: 'black'}}>Logout</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>


            <div className="row">

                <div className="col-8">


                    <Container
                        className="d-flex flex-column py-2"
                        style={{height: "90vh"}}>

                        <Container
                            className="d-flex flex-column py-2"
                            style={{height: "75vh", padding: "1rem", overflow: "auto"}}>


                            {whichService === "Spotify" ? (

                                    <SpotifySearch
                                        spotifyAccessToken={spotifyAccessToken}
                                        chooseTrack={chooseTrack}
                                        addToQueue={addToQueue}
                                    />)


                                : whichService === "Apple Music" ? (
                                        <h1>Apple Music Not Available Yet</h1>)


                                    : whichService === "Youtube" ? (

                                            <YoutubeSearch
                                                youtubeAccessToken={youtubeAccessToken}
                                                chooseTrack={chooseTrack}
                                                addToQueue={addToQueue}
                                            />)


                                        : (<h1>No Player Selected</h1>)}


                        </Container>
                        <Container>
                            <CustomSpotifyPlayer
                                accessToken={spotifyAccessToken}
                                trackUri={playingTrack?.uri}
                                playNextInTheQueue={playNextInQueue}
                            />

                        </Container>
                    </Container>
                </div>

                <div className="col">
                    <Queue newQueueResults={queueResults} clearQ={clearQueue} deleteFromQueue={deleteFromQueue}/>
                </div>

            </div>
        </div>
    )


}
