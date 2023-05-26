import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from "./Dashboard"

const spotifyCode = new URLSearchParams(window.location.search).get("code");
const linkThing = new URLSearchParams(window.location);
let whichService = "N/A"

if(linkThing.toString().includes("google")){
  whichService = "Youtube";
}
else{
  whichService = "Spotify"
}



function App() {
  return <Dashboard code={spotifyCode} whichService={whichService}/> 
}

export default App
