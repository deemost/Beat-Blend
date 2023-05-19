import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./CustomSpotifyPlayer";
import Queue from "./Queue";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "8ecf06d5fca640ca80c33ef1d00287e2",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queueResults, setQueueResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    console.log("AHHHHHHH" + JSON.stringify(queueResults));
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  function playNextInQueue() {
    setPlayingTrack(queueResults[0]);
    setQueueResults((queueResults) => queueResults.filter((_, index) => index !== 0));
    setSearch("");
    setLyrics("");
  }

  function addToQueue(track) {
    setQueueResults((queueResults) => [...queueResults, track]);

    // console.log("------------------- " + JSON.stringify(accessToken));

    // try {
    //     const response =  axios.post('https://api.spotify.com/v1/me/player/queue?uri=' + track.uri, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //       });

    //     if (!response.ok) {
    //       throw new Error(`Error! status: ${response.status}`);
    //     }

    //   }
    //   catch (err) {
    //       console.log(err);
    //   }
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
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
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8">
          <Container
            className="d-flex flex-column py-2"
            style={{ height: "100vh" }}
          >
            <Form.Control
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
              {searchResults.map((track) => (
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                  addToQueue={addToQueue}
                />
              ))}
              {searchResults.length === 0 && (
                <div className="text-center" style={{ whiteSpace: "pre" }}>
                  {lyrics}
                </div>
              )}
            </div>
            <div>
              {/* THIS IS WHERE THE PLAYER IS */}
              <Player accessToken={accessToken} trackUri={playingTrack?.uri} playNextInTheQueue={playNextInQueue} />
            </div>
          </Container>
        </div>
        <div class="col-lg-2">
          <Container>
            <Queue
              accessToken={accessToken}
              playNextInTheQueue={playNextInQueue}
            ></Queue>

            {queueResults.map((track) => (
              <div>
                <img
                  src={track.albumUrl}
                  style={{ height: "32px", width: "32px" }}
                />
                {track.title}
              </div>
            ))}
          </Container>
        </div>
      </div>
    </div>
  );
}
