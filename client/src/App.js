import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from "./Dashboard"

const spotifyCode = new URLSearchParams(window.location.search).get("code");

function App() {
  return <Dashboard spotifyCode={spotifyCode}/> 
}

export default App
