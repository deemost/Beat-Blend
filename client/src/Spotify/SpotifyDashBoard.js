import SpotifySearch from "./SpotifySearch";
import useSpotifyAuth from "./useSpotifyAuth";
import axios from "axios";
import Queue from "../Queue";
import {useEffect, useState} from "react";
import CustomSpotifyPlayer from "./CustomSpotifyPlayer";
import {Container} from "react-bootstrap";

// export default function SpotifyDashBoard({accessToken, givePlayingTrack}) {

export default function SpotifyDashBoard({accessToken}) {

    // const [queueResults, setQueueResults] = useState([]);
    // const [playingTrack, setPlayingTrack] = useState();

    // console.log("code = " + accessToken);

    // const spotifyAccessToken = useSpotifyAuth(code);

    // const spotifyAccessToken = accessToken;


    // console.log("access token = " + spotifyAccessToken);


    // useEffect(() => {
    //
    //     // console.log("Getting Queue");
    //
    //     axios
    //         .get("http://localhost:3001/queue")
    //         .then((res) => {
    //             setQueueResults(res.data.queueResults);
    //         });
    //
    // }, [givePlayingTrack]);

    // function chooseTrack(track) {
    //
    //     // setPlayingTrack(track);
    //
    //     axios
    //         .post("http://localhost:3001/queue/playingtrack", {
    //             track
    //         })
    //         .then((res) => {
    //             setPlayingTrack(res.data.playingTrack);
    //         });
    // }

    // function addToQueue(track) {
    //     axios
    //         .post("http://localhost:3001/queue", {
    //             track
    //         })
    //         .then((res) => {
    //             setQueueResults(res.data.queueResults);
    //         });
    // }

    // function clearQueue() {
    //     axios
    //         .delete("http://localhost:3001/queue/all")
    //         .then((res) => {
    //             setQueueResults(res.data.queueResults);
    //         });
    // }

    // function playNextInQueue() {
    //     // console.log("QUEUE: " + queueResults);
    //     setPlayingTrack(queueResults[0]);
    //
    //     axios
    //         .delete("http://localhost:3001/queue/specific")
    //         .then((res) => {
    //             setQueueResults(res.data.queueResults);
    //         });
    // }

    // function deleteFromQueue(trackIndexInQueue) {
    //
    //     axios
    //         .delete("http://localhost:3001/queue/specific", {
    //             params: {
    //                 trackIndexInQueue: trackIndexInQueue,
    //             },
    //         })
    //         .then((res) => {
    //             setQueueResults(res.data.queueResults);
    //         });
    //
    // }


    return (
        <div className="row">

            {/*<div className="col-8">*/}
            {/*    <Container*/}
            {/*        className="d-flex flex-column py-2"*/}
            {/*        style={{height: "90vh"}}>*/}

            {/*        <Container*/}
            {/*            className="d-flex flex-column py-2"*/}
            {/*            style={{height: "85vh"}}>*/}
            {/*            <div*/}
            {/*                className="flex-grow-1 my-2"*/}
            {/*                style={{overflowY: "auto"}}*/}
            {/*            >*/}
            {/*            <SpotifySearch*/}
            {/*                spotifyAccessToken={spotifyAccessToken}*/}
            {/*                chooseTrack={chooseTrack}*/}
            {/*                addToQueue={addToQueue}*/}
            {/*            />*/}
            {/*            </div>*/}

            {/*        </Container>*/}

            {/*    <Container>*/}
            {/*        <CustomSpotifyPlayer*/}
            {/*            accessToken={spotifyAccessToken}*/}
            {/*            trackUri={playingTrack?.uri}*/}
            {/*            playNextInTheQueue={playNextInQueue}*/}
            {/*        />*/}
            {/*    </Container>*/}

            {/*    </Container>*/}
            {/*</div>*/}


            {/*<div className="col">*/}
            {/*    <Queue newQueueResults={queueResults} clearQ={clearQueue} deleteFromQueue={deleteFromQueue}/>*/}
            {/*</div>*/}

        </div>

    )
}