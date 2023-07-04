import React, {useState} from "react"
import {Button, Form} from "react-bootstrap";
import YoutubeTrackSearchResult from "./YoutubeTrackSearchResult";
import axios from "axios";


export default function YoutubeSearch({youtubeAccessToken, chooseTrack, addToQueue}) {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    function doSearch(event) {

        event.preventDefault();


        axios
            .get(process.env.REACT_APP_URL_PREFIX + "/search/youtube", {
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

            <Form onSubmit={doSearch}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="YOUTUBE Search Songs/Artists" onChange={(e) => {
                        console.log("inside onChange...")
                        if (e.target.value.length > 0) {
                            setSearchTerm(e.target.value);
                        } else {
                            setSearchTerm(undefined);
                        }
                    }
                    }/>
                    {/*<Button onClick={doSearch}>Go</Button>*/}
                </Form.Group>
            </Form>

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





