import {useState, useEffect} from "react"
// import SpotifyPlayer from "react-spotify-web-playback"
import SpotifyWebApi from "spotify-web-api-node";
import {Form} from "react-bootstrap";
import SpotifyTrackSearchResult from "./SpotifyTrackSearchResult";
// import getQueue from "react-spotify-web-playback"

export default function SpotifySearch({spotifyAccessToken, chooseTrack, addToQueue}) {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(spotifyAccessToken);


    useEffect(() => {
        console.log("HEY")
    }, [searchResults]);

    function doSearch(searchTerm) {


        if (searchTerm !== -1){

            console.log('inside doSearch...')
        if (searchTerm != null) {
            spotifyApi.searchTracks(searchTerm).then((res) => {
                let results = res.body.tracks.items.map((track) => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image;
                            return smallest;
                        },
                        track.album.images[0]
                    );

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    };
                });
                console.log("results: " + JSON.stringify(results));
                setSearchResults(results);
            });
        }

    }
        else{
            setSearchResults([]);
        }

    }

    return (
        <div>
            <Form.Control
                type="text"
                placeholder="Search Songs/Artists"
                onChange={(e) => {
                    console.log("inside onChange...")
                    if(e.target.value.length > 0){
                        doSearch(e.target.value);
                    }
                    else{
                        doSearch(-1);
                    }
                }
            }
            />

            {searchResults.map((track) => (
                <SpotifyTrackSearchResult
                    track={track}
                    chooseTrack={chooseTrack}
                    addToQueue={addToQueue}
                />
            ))}


        </div>
    )
}