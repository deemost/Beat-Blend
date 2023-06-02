import { useState, useEffect } from "react";
import useSpotifyAuth from "./Spotify/useSpotifyAuth";
import CustomSpotifyPlayer from "./Spotify/CustomSpotifyPlayer";
import Queue from "./Queue";
import SpotifyLogin from "./Spotify/SpotifyLogin";
import SpotifyTrackSearchResult from "./Spotify/SpotifyTrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import CustomYoutubePlayer from "./Youtube/CustomYoutubePlayer";
import YoutubeLogin from "./Youtube/YoutubeLogin";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "8ecf06d5fca640ca80c33ef1d00287e2",
});

export default function Dashboard({ code, whichService }) {


  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queueResults, setQueueResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [whichServiceSearch, setWhichServiceSearch] = useState();
  
  const [loggedInWithSpotify, setLoggedInWithSpotify] = useState(false);
  const [loggedInWithAppleMusic, setLoggedInWithAppleMusic] = useState(false);
  const [loggedInWithYoutube, setLoggedInWithYoutube] = useState(false);

  const [spotifyCode, setSpotifyCode] = useState("");
  const [youtubeCode, setYoutubeCode] = useState("");

  const SpotifyAccessToken = useSpotifyAuth(spotifyCode);


  // console.log(spotifyCode);
  // console.log(showLoginForSpotify);

  // console.log(whichServiceSearch);

  // console.log(SpotifyAccessToken);
  console.log("code: " + code);
  console.log("service: " + whichService);
  console.log("cccspotify: " + spotifyCode);
  console.log("cccyoutube: " + youtubeCode);
  console.log("queueRes: " + queueResults);


  useEffect(() => {

    axios
      .get("http://localhost:3001/spotify/queue")
      .then((res) => {
        setQueueResults(res.data.queueResults);
      });
  });



  useEffect(() => {
    if(whichService === "Spotify"){
      setSpotifyCode(code);
    }
    else{
      setYoutubeCode(code);
    }
  });



  function showSpotify() {

    setWhichServiceSearch("Spotify");

    if (spotifyCode && whichService === "Spotify") {
      setLoggedInWithSpotify(true);
      
    } else {
      setLoggedInWithSpotify(false);
      
    }

    // console.log(showLoginForSpotify);
  }

  function showAppleMusic() {




    setWhichServiceSearch("Apple Music");

    if (code && whichService === "Apple Music") {
      setLoggedInWithAppleMusic(true);
      
    } else {
      setLoggedInWithAppleMusic(false);
      
    }
  }

  function showYoutube() {

   

    setWhichServiceSearch("Youtube");

    if (youtubeCode && whichService === "Youtube") {
      setLoggedInWithYoutube(true);
    } else {
      setLoggedInWithYoutube(false);
    }
  }

  function chooseTrack(track) {
    console.log("Chose Track");
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  function playNextInQueue() {
    console.log("QUEUE: " + queueResults);
    setPlayingTrack(queueResults[0]);
    setQueueResults((queueResults) =>
      queueResults.filter((_, index) => index !== 0)
    );
    setSearch("");
    setLyrics("");
  }

  function addToQueue(track) {


    axios
      .post("http://localhost:3001/spotify/queue", {
        track   
      })
      .then((res) => {
        setQueueResults(res.data.queueResults);
      });


    // setQueueResults((queueResults) => [...queueResults, track]);





  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/spotify/lyrics", {
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
    if (!SpotifyAccessToken) return;
    spotifyApi.setAccessToken(SpotifyAccessToken);
  }, [SpotifyAccessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!SpotifyAccessToken) return;

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
  }, [search, SpotifyAccessToken]);

  return (
    <div>
      {whichServiceSearch === "Spotify" ? (
        <div>
          {loggedInWithSpotify ? (
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-8">
                  <div class="row">
                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showSpotify}
                        class="btn btn-success btn-lg btn-block"
                      >
                        Spotify
                      </button>
                    </div>

                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showAppleMusic}
                        class="btn btn-info btn-lg btn-block"
                      >
                        Apple Music
                      </button>
                    </div>

                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showYoutube}
                        class="btn btn-danger btn-lg btn-block"
                      >
                        Youtube
                      </button>
                    </div>
                  </div>

                  <Container
                    className="d-flex flex-column py-2"
                    style={{ height: "90vh" }}
                  >
                    <div>
                      <Container
                        className="d-flex flex-column py-2"
                        style={{ height: "80vh" }}
                      >
                        {" "}
                        <Form.Control
                          type="search"
                          placeholder="Search Songs/Artists"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                          className="flex-grow-1 my-2"
                          style={{ overflowY: "auto" }}
                        >
                          {searchResults.map((track) => (
                            <SpotifyTrackSearchResult
                              track={track}
                              key={track.uri}
                              chooseTrack={chooseTrack}
                              addToQueue={addToQueue}
                            />
                          ))}
                          {searchResults.length === 0 && (
                            <div
                              className="text-center"
                              style={{ whiteSpace: "pre" }}
                            >
                              {lyrics}
                            </div>
                          )}
                        </div>{" "}
                      </Container>
                    </div>

                    <div>
                      {/* THIS IS WHERE THE PLAYER IS */}
                      <CustomSpotifyPlayer
                        accessToken={SpotifyAccessToken}
                        trackUri={playingTrack?.uri}
                        playNextInTheQueue={playNextInQueue}
                      />
                    </div>
                  </Container>
                </div>

                <div class="col-lg-2">
                  <Container>
                    <Queue></Queue>

                    {/* <CustomYoutubePlayer videoId={"bhkg2godRDc"}></CustomYoutubePlayer> */}

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
          ) : (
            <SpotifyLogin></SpotifyLogin>
          )}
        </div>
      ) : whichServiceSearch === "Apple Music" ? (
        <div>
          {loggedInWithAppleMusic ? (
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-8">
                  <div class="row">
                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showSpotify}
                        class="btn btn-success btn-lg btn-block"
                      >
                        Spotify
                      </button>
                    </div>

                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showAppleMusic}
                        class="btn btn-info btn-lg btn-block"
                      >
                        Apple Music
                      </button>
                    </div>

                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showYoutube}
                        class="btn btn-danger btn-lg btn-block"
                      >
                        Youtube
                      </button>
                    </div>
                  </div>

                  <Container
                    className="d-flex flex-column py-2"
                    style={{ height: "90vh" }}
                  >
                    <div>
                      <Container
                        className="d-flex flex-column py-2"
                        style={{ height: "80vh" }}
                      >
                        {" "}
                        <Form.Control
                          type="search"
                          placeholder="Search Songs/Artists"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                          className="flex-grow-1 my-2"
                          style={{ overflowY: "auto" }}
                        >
                          {searchResults.map((track) => (
                            <SpotifyTrackSearchResult
                              track={track}
                              key={track.uri}
                              chooseTrack={chooseTrack}
                              addToQueue={addToQueue}
                            />
                          ))}
                          {searchResults.length === 0 && (
                            <div
                              className="text-center"
                              style={{ whiteSpace: "pre" }}
                            >
                              {lyrics}
                            </div>
                          )}
                        </div>{" "}
                      </Container>
                    </div>

                    <div>
                      {/* THIS IS WHERE THE PLAYER IS */}
                      <h1></h1>
                    </div>
                  </Container>
                </div>

                <div class="col-lg-2">
                  <Container>
                    <Queue></Queue>

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
          ) : (
            <SpotifyLogin></SpotifyLogin>
          )}
        </div>
      ) : whichServiceSearch === "Youtube" ? (
        <div>
          {loggedInWithYoutube ? (
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-8">
                  <div class="row">
                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showSpotify}
                        class="btn btn-success btn-lg btn-block"
                      >
                        Spotify
                      </button>
                    </div>

                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showAppleMusic}
                        class="btn btn-info btn-lg btn-block"
                      >
                        Apple Music
                      </button>
                    </div>

                    <div class="col-lg">
                      <button
                        type="button"
                        onClick={showYoutube}
                        class="btn btn-danger btn-lg btn-block"
                      >
                        Youtube
                      </button>
                    </div>
                  </div>

                  <Container
                    className="d-flex flex-column py-2"
                    style={{ height: "90vh" }}
                  >
                    <div>
                      <Container
                        className="d-flex flex-column py-2"
                        style={{ height: "80vh" }}
                      >
                        {" "}
                        <Form.Control
                          type="search"
                          placeholder="Search Songs/Artists"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                          className="flex-grow-1 my-2"
                          style={{ overflowY: "auto" }}
                        >
                          {searchResults.map((track) => (
                            <SpotifyTrackSearchResult
                              track={track}
                              key={track.uri}
                              chooseTrack={chooseTrack}
                              addToQueue={addToQueue}
                            />
                          ))}
                          {searchResults.length === 0 && (
                            <div
                              className="text-center"
                              style={{ whiteSpace: "pre" }}
                            >
                              {lyrics}
                            </div>
                          )}
                        </div>{" "}
                      </Container>
                    </div>

                    <div>
                      {/* THIS IS WHERE THE PLAYER IS */}
                      <CustomYoutubePlayer></CustomYoutubePlayer>
                    </div>
                  </Container>
                </div>

                <div class="col-lg-2">
                  <Container>
                    <Queue></Queue>

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
          ) : (
            <YoutubeLogin></YoutubeLogin>
          )}
        </div>
      ) : (
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg">
              <button
                type="button"
                onClick={showSpotify}
                class="btn btn-success btn-lg btn-block"
              >
                Spotify
              </button>
            </div>

            <div class="col-lg">
              <button
                type="button"
                onClick={showAppleMusic}
                class="btn btn-info btn-lg btn-block"
              >
                Apple Music
              </button>
            </div>

            <div class="col-lg">
              <button
                type="button"
                onClick={showYoutube}
                class="btn btn-danger btn-lg btn-block"
              >
                Youtube
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
