import {useState, useEffect} from "react"
// import SpotifyPlayer from "react-spotify-web-playback"
import SpotifyWebApi from "spotify-web-api-node";
import {Form} from "react-bootstrap";
import YoutubeTrackSearchResult from "./YoutubeTrackSearchResult";
import axios from "axios";
// import getQueue from "react-spotify-web-playback"


export default function YoutubeSearch({youtubeAccessToken, chooseTrack, addToQueue}) {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const youtubeSearchApi = require("youtube-search-api");


    function doSearch(searchTerm) {



        axios
            .get("http://localhost:3001/callback/youtube/search", {
                params: {
                    searchTerm: searchTerm
                }
            })
            .then((res) => {
                setSearchResults(res.results);
            });

    }

    return (
        <div>
            <Form.Control
                type="text"
                placeholder="YOUTUBE Search Songs/Artists"
                onChange={(e) => {
                    console.log("inside onChange...")
                    if (e.target.value.length > 0) {
                        doSearch(e.target.value);
                    } else {
                        doSearch(-1);
                    }
                }
                }
            />

            {searchResults.map((track) => (
                <div key={track.uri}>
                    <YoutubeTrackSearchResult
                        track={track}
                        chooseTrack={chooseTrack}
                        addToQueue={addToQueue}
                    />
                </div>
            ))}


        </div>
    )
}





