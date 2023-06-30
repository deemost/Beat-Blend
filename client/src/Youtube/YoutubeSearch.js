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

  //       curl \
  // 'https://youtube.googleapis.com/youtube/v3/search?q=basketball&key=AIzaSyAfoqGxQyF5tOyjjNeAiK8CIQrOaLLn5cQ' \
  // --header 'Authorization: Bearer ya29.a0AbVbY6ObDyFhCykUlSeQJQs9USrxUr4iYo3XUFbwSD0Ds43H5M_dQpRb6E4Lhz5hrRXC_rEcMZvkxZlRQcQGzVo6TZg4JStUcu2y7FMSdCiO50vXMG-RuDz4rWZtBut89dXlIC6K4ogJBiGqXve-TkGR9-XKaCgYKAUASARISFQFWKvPl28bwcieLa0wK0pAGvtQMog0163' \
  // --header 'Accept: application/json' \
  // --compressed
  //       });

        // console.log("KKSJDDH: "+ youtubeAccessToken);

        const config = {
            headers:{
                Authorization: 'Bearer ' + youtubeAccessToken,
                Accept:  'application/json'
            }
        };

        axios
            .get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + searchTerm +"&key=AIzaSyAfoqGxQyF5tOyjjNeAiK8CIQrOaLLn5cQ", config)
            .then((res) => {
                setSearchResults(res.data.items);
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





