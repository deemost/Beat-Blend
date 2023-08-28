import React, {useEffect, useState} from "react";
import CustomSpotifyPlayer from "./Spotify/CustomSpotifyPlayer";
import axios from "axios";
import {Container, Navbar} from "react-bootstrap";
import SpotifySearch from "./Spotify/SpotifySearch";
import YoutubeSearch from "./Youtube/YoutubeSearch";
import Queue from "./Queue";
import Nav from 'react-bootstrap/Nav';
import CustomYoutubePlayer from "./Youtube/CustomYoutubePlayer";


export default function HostView( {count, handleClick} ) {

    const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
    const [youtubeAccessToken, setYoutubeAccessToken] = useState("");
    const [whichService, setWhichService] = useState("");
    const [playingTrack, setPlayingTrack] = useState();
    const [queueResults, setQueueResults] = useState([]);
    const [room, setRoom] = useState("");



    const ws = new WebSocket("ws://localhost:8082/");

    ws.addEventListener("message", (m) => {

        if(JSON.stringify(m) === "bark"){
            console.log("bark");
        }

        else{
            console.log("Heard you server!: " + JSON.stringify(m));
            // ws.send("YO");
        }
    });



    useEffect(() => {
        axios
            .get(process.env.REACT_APP_URL_PREFIX + "/queue/playingtrack")
            .then((res) => {
                setPlayingTrack(res.data.playingTrack);
            });

        axios
            .get(process.env.REACT_APP_URL_PREFIX + "/callback/spotify/access")
            .then((res) => {
                setSpotifyAccessToken(res.data.access_token);
            });

        axios
            .get(process.env.REACT_APP_URL_PREFIX + "/callback/youtube/access")
            .then((res) => {
                setYoutubeAccessToken(res.data.access_token);
            });

        axios
            .get(process.env.REACT_APP_URL_PREFIX + "/queue")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });

        axios
            .get(process.env.REACT_APP_URL_PREFIX + "/room")
            .then((res) => {
                setRoom(res.data.room);
            });

        console.log("access token: " + spotifyAccessToken);
        // eslint-disable-next-line
    }, []);


    function playNextInQueue() {
        axios
            .get(process.env.REACT_APP_URL_PREFIX + "/queue")
            .then((res) => {
                setQueueResults(res.data.queueResults);
                // console.log("QUEUE: " + res.data.queueResults.length)
            });

        console.log("QUEUE: " + queueResults.length);

        // let nextInQueue = queueResults[0];

        axios
            .post(process.env.REACT_APP_URL_PREFIX + "/queue/playingtrack", {
                track: (queueResults[0])
            })
            .then((res) => {
                setPlayingTrack(res.data.playingTrack);
            });

        axios
            .delete(process.env.REACT_APP_URL_PREFIX + "/queue/specific")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }


    const handleButtonsClick = (str) => () => {
        setWhichService(str);

        if (str === "Spotify" && !spotifyAccessToken) {
            window.location.replace(process.env.REACT_APP_URL_PREFIX + '/login/spotify');
        }

        if (str === "Youtube" && !youtubeAccessToken) {
            window.location.replace(process.env.REACT_APP_URL_PREFIX + '/login/youtube');
        }

        if (str === "TEST") {
            handleClick();
        }

        if (str === "Logout") {
            axios
                .post(process.env.REACT_APP_URL_PREFIX + "/callback/spotify/access", {
                    undefined
                })
                .then((res) => {
                    setSpotifyAccessToken(res.data.access_token);
                });

            axios
                .post(process.env.REACT_APP_URL_PREFIX + "/callback/youtube/access", {
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
            .post(process.env.REACT_APP_URL_PREFIX + "/queue/playingtrack", {
                track
            })
            .then((res) => {
                setPlayingTrack(res.data.playingTrack);
            });

        console.log("PLAYING TRACK: " + JSON.stringify(track));
    }

    function addToQueue(track) {
        axios
            .post(process.env.REACT_APP_URL_PREFIX + "/queue", {
                track
            })
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }

    function clearQueue() {
        axios
            .delete(process.env.REACT_APP_URL_PREFIX + "/queue/all")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }


    function deleteFromQueue(trackIndexInQueue) {

        axios
            .delete(process.env.REACT_APP_URL_PREFIX + "/queue/specific", {
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
                                <div>&nbsp;</div>
                                <Nav.Item>
                                    <Nav.Link onClick={handleButtonsClick("TEST")}
                                              className='btn btn-danger btn-sm'
                                              style={{color: 'white'}}>TEST</Nav.Link>
                                </Nav.Item>
                                <div>{JSON.stringify(count)}</div>
                            </Nav>
                        </Navbar.Collapse>
                        <div>Room # {room}</div>
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

                            {playingTrack?.uri ? (<CustomSpotifyPlayer
                                accessToken={spotifyAccessToken}
                                trackUri={playingTrack?.uri}
                                playNextInTheQueue={playNextInQueue}
                            />)

                                : (<CustomYoutubePlayer playNextInTheQueue={playNextInQueue}
                                                        videoId={playingTrack?.id.videoId}/>)}


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
