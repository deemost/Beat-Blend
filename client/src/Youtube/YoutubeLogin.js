import React from "react"
import { Container } from "react-bootstrap"

const AUTH_URL =
// "https://accounts.spotify.com/authorize?client_id=8ecf06d5fca640ca80c33ef1d00287e2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
"https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000&client_id=934374130370-fbe30ifh366vjc1ut5t4j3i6a4i066m4.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email"

export default function YoutubeLogin() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-danger btn-lg" href={AUTH_URL}>
        Login With Youtube
      </a>
    </Container>
  )
}
