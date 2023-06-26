import React from "react";

export default function SpotifyQueueTrack({ track, deleteFromQueue, trackIndexInQueue }) {
  function handleDeleteQueue() {
    console.log("========== " + JSON.stringify(track));
    deleteFromQueue(trackIndexInQueue);
  }

  return (
    <div>
      <img src={track.albumUrl} style={{ height: "32px", width: "32px" }} />
      {track.title}
      <button onClick={handleDeleteQueue} type="button" className="btn btn-primary btn-sm">X</button>
    </div>
  );
}
