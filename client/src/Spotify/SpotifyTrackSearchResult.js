import React from "react";

export default function SpotifyTrackSearchResult({ track, chooseTrack, addToQueue }) {
  function handlePlayForSong() {
    //   console.log( "JJJJJJJJ" + JSON.stringify(track));
    chooseTrack(track);
  }

  function handleQueue() {
    // console.log( "JJJJJJJJ" + JSON.stringify(track));
  addToQueue(track);
}

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      <img onClick={handlePlayForSong} src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
        <button onClick={handleQueue} type="button" className="btn btn-primary btn-sm">Add To Queue</button>
      </div>
    </div>
  );
}
