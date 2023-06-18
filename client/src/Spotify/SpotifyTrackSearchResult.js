import React from "react";

export default function SpotifyTrackSearchResult({ track }) {
  function handlePlayForSong() {

  }

  function handleQueue() {

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
        <button onClick={handleQueue} type="button" class="btn btn-primary btn-sm">Add To Queue</button>
      </div>
    </div>
  );
}
