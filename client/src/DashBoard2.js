import SpotifySearch from "./Spotify/SpotifySearch";
import useSpotifyAuth from "./Spotify/useSpotifyAuth";
import axios from "axios";
import Queue from "./Queue";
import {useState} from "react";
import CustomSpotifyPlayer from "./Spotify/CustomSpotifyPlayer";
import {Container} from "react-bootstrap";

export default function Dashboard2({code}) {

    const [queueResults, setQueueResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    console.log("code = " + code);

    // const spotifyAccessToken = useSpotifyAuth(code);

    const spotifyAccessToken = "BQBKkExCi38DAo_LPOFZHRfnyMJZtFYU9172hpGQq_Ygnhz_tLaRRB7wjMxe3mTe3Xqgawooe0rYnyK3_jQHFiEk4X_CU1NoLAK6C_saa4rw3ak9pIhWeAldGvQlf8sM0M4780q7NbsdykBntivvyVQ4juFXPOKWr16TiUSv2d18s7_z0sjBx5-TvTos3YxlyqBedZYWTDxbfEiNqAXzmRSqKb0pKn7LmFKPmtM";


    console.log("access token = " + spotifyAccessToken);


    function chooseTrack(track) {
        // console.log("Chose Track");
        setPlayingTrack(track);
        // setSearch("");
        // setLyrics("");
    }

    function addToQueue(track) {
        axios
            .post("http://localhost:3001/spotify/queue", {
                track
            })
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }

    function clearQueue(){
        axios
            .delete("http://localhost:3001/spotify/queue/all")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
    }

    function playNextInQueue() {
        // console.log("QUEUE: " + queueResults);
        setPlayingTrack(queueResults[0]);

        axios
            .delete("http://localhost:3001/spotify/queue/specific")
            .then((res) => {
                setQueueResults(res.data.queueResults);
            });
        //
        // setSearch("");
        // setLyrics("");
    }


    return (
        <div>


            <div className="row">



                <div className="col-8">
                    <Container
                        className="d-flex flex-column py-2"
                        style={{height: "80vh"}}>

                    <Container
                        className="d-flex flex-column py-2"
                        style={{height: "80vh"}}>

                    <SpotifySearch
                        spotifyAccessToken={spotifyAccessToken}
                        chooseTrack={chooseTrack}
                        addToQueue={addToQueue}
                    />

                    </Container>

                    <CustomSpotifyPlayer
                        accessToken={spotifyAccessToken}
                        trackUri={playingTrack?.uri}
                        playNextInTheQueue={playNextInQueue}
                    />

                </Container>
                </div>



                <div className="col">
                    <Queue newQueueResults={queueResults} clearQ={clearQueue}></Queue>
                </div>

            </div>


        </div>
    )
}