import React from "react";

export default function SpotifyQueueTrack({ track, deleteFromQueue, trackIndexInQueue }) {
  function handleDeleteQueue() {
    // console.log( "JJJJJJJJ" + JSON.stringify(track));
    deleteFromQueue(trackIndexInQueue);
  }

  return (
    <div>
      <img src={track.albumUrl} style={{ height: "32px", width: "32px" }} />
      {track.title}
      <button onClick={handleDeleteQueue} type="button" class="btn btn-primary btn-sm">X</button>
    </div>
  );
}
