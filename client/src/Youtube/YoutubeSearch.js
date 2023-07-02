import {useState} from "react"
import {Form} from "react-bootstrap";
import YoutubeTrackSearchResult from "./YoutubeTrackSearchResult";
import axios from "axios";


export default function YoutubeSearch({youtubeAccessToken, chooseTrack, addToQueue}) {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const youtubeSearchApi = require("youtube-search-api");


    function doSearch(searchTerm) {
        axios
            .get("http://localhost:3001/search/youtube", {
                params: {
                    searchTerm: searchTerm
                }
            })
            .then((res) => {
                // console.log('---- yt search results from server: ' + JSON.stringify(res))
                setSearchResults(res.data);
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
                }/>

            {searchResults.map((track) => (
                <div key={track.id.videoId}>
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





