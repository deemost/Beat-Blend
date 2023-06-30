import React, {useEffect, useState} from "react";
import CustomSpotifyPlayer from "./Spotify/CustomSpotifyPlayer";
import axios from "axios";
import {Container} from "react-bootstrap";
import SpotifySearch from "./Spotify/SpotifySearch";
import YoutubeSearch from "./Youtube/YoutubeSearch";
import Queue from "./Queue";
import spotifylogo from "./spotifylogo.png"
import spotifylogo2 from "./spotifylogo2.png"
import "./testing-background.css";

import CustomYoutubePlayer from "./Youtube/CustomYoutubePlayer";


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

        // <div className="p-3 mb-2 bg-warning text-dark">

        <div className="header">
            <div className="row">
                <div className="col-lg">
                    <button type="button" onClick={handleButtonsClick("Spotify")}
                            className="btn btn-success btn-lg btn-block"> Spotify
                    </button>
                    {/*<img onClick={handleButtonsClick("Spotify")} src={spotifylogo2} style={{ height: "100px", width: "300px", overflow: "hidden", display: "flex" }}/>*/}

                </div>

                <div className="col-lg">
                    <button type="button" onClick={handleButtonsClick("Apple Music")}
                            className="btn btn-info btn-lg btn-block"> Apple Music
                    </button>
                </div>

                <div className="col-lg">
                    <button type="button" onClick={handleButtonsClick("Youtube")}
                            className="btn btn-danger btn-lg btn-block"> Youtube
                    </button>
                </div>

                <div className="col-lg">
                    <button type="button" onClick={handleButtonsClick("Logout")}
                            className="btn btn-lg btn-block"> Logout
                    </button>
                </div>
            </div>


            <div className="row">

                <div className="col-8">


                    <Container
                        className="d-flex flex-column py-2"
                        style={{height: "90vh"}}>

                        <Container
                            className="d-flex flex-column py-2"
                            style={{height: "75vh" ,padding: "1rem", overflow: "auto"}}>


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