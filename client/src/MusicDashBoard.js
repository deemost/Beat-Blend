import React, {useEffect, useState} from "react";
import CustomSpotifyPlayer from "./Spotify/CustomSpotifyPlayer";
import axios from "axios";
import {Container} from "react-bootstrap";
import SpotifySearch from "./Spotify/SpotifySearch";
import Queue from "./Queue";


export default function MusicDashBoard() {

    const [accessToken, setAccessToken] = useState("");
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
            .get("http://localhost:3001/callback/access")
            .then((res) => {
                setAccessToken(res.data.access_token);
            });

        axios
            .get("http://localhost:3001/queue")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });


        console.log("access token: " + accessToken);


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

        if(str === "Spotify" &&  !accessToken){
            window.location.replace('http://localhost:3001/login/spotify');
            }

        if(str === "Logout"){
            axios
                .post("http://localhost:3001/callback/access", {
                    undefined
                })
                .then((res) => {
                    setAccessToken(res.data.access_token);
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

            <div className="row">
                <div className="col-lg">
                   <button type="button" onClick={handleButtonsClick("Spotify")}
                            className="btn btn-success btn-lg btn-block"> Spotify
                    </button>
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


            {whichService === "Spotify" ? (
                <h1>    </h1>) : whichService === "Apple Music" ? (
                <h1>Apple Music Not Available Yet</h1>) : whichService === "Youtube" ? (
                <h1>Youtube Not Available Yet</h1>) : (<h1>No Player Selected</h1>)}


            <div className="row">

                <div className="col-8">
                    <Container
                        className="d-flex flex-column py-2"
                        style={{height: "90vh"}}>

                        <Container
                            className="d-flex flex-column py-2"
                            style={{height: "75vh"}}>
                            <div
                                className="flex-grow-1 my-2"
                                style={{overflowY: "auto"}}
                            >
                                <SpotifySearch
                                    spotifyAccessToken={accessToken}
                                    chooseTrack={chooseTrack}
                                    addToQueue={addToQueue}
                                />
                            </div>

                        </Container>

                        <Container>
                            <CustomSpotifyPlayer
                                accessToken={accessToken}
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