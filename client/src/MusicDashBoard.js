import React, {useEffect, useState} from "react";
import SpotifyDashBoard from "./Spotify/SpotifyDashBoard";
import CustomSpotifyPlayer from "./Spotify/CustomSpotifyPlayer";
import axios from "axios";
import {Container} from "react-bootstrap";


export default function MusicDashBoard({accessToken}) {

    const [whichService, setWhichService] = useState("");
    const [playingTrack, setPlayingTrack] = useState();
    const [queueResults, setQueueResults] = useState([]);

    console.log("access token: " + accessToken);


    useEffect(() => {

        if(accessToken){
            setWhichService("Spotify");
        }



        axios
            .get("http://localhost:3001/queue/playingtrack")
            .then((res) => {
                setPlayingTrack(res.data.playingTrack);
            });


    }, []);


    function givePlayingTrack(track){
        // console.log("Access Token: " + accessToken);
        console.log("playing track www: " + JSON.stringify(playingTrack));
        // setPlayingTrack(track);



    }

    function playNextInQueue() {
        // console.log("QUEUE: " + queueResults);
        setPlayingTrack(queueResults[0]);

        axios
            .delete("http://localhost:3001/queue/specific")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }


    useEffect(() => {

        console.log("Getting Queue");

        axios
            .get("http://localhost:3001/queue")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });

    }, []);


    console.log("Which Service: " + whichService);
    // console.log("Access Token: " + accessToken);


    const handleClick = (str) => () => {
        setWhichService(str);

        if(str === "Spotify" &&  !accessToken){
            window.location.replace('http://localhost:3001/login/spotify');
            }
    };


    return (

        <div>

            <div className="row">
                <div className="col-lg">
                   <button type="button" onClick={handleClick("Spotify")}
                            className="btn btn-success btn-lg btn-block"> Spotify
                    </button>
                </div>

                <div className="col-lg">
                    <button type="button" onClick={handleClick("Apple Music")}
                            className="btn btn-info btn-lg btn-block"> Apple Music
                    </button>
                </div>

                <div className="col-lg">
                    <button type="button" onClick={handleClick("Youtube")}
                            className="btn btn-danger btn-lg btn-block"> Youtube
                    </button>
                </div>
            </div>

            {whichService === "Spotify" ? (
                <SpotifyDashBoard accessToken={accessToken} givePlayingTrack={givePlayingTrack}></SpotifyDashBoard>) : whichService === "Apple Music" ? (
                <h1>Apple Music Not Available Yet</h1>) : whichService === "Youtube" ? (
                <h1>Youtube Not Available Yet</h1>) : (<h1>No Player Selected</h1>)}


            <div className="col-8">

                <Container
                    className="d-flex flex-column py-2"
                    style={{height: "40vh"}}>
            <CustomSpotifyPlayer
                accessToken={accessToken}
                trackUri={playingTrack?.uri}
                playNextInTheQueue={playNextInQueue}
            />
                </Container>

            </div>

        </div>
    )


}