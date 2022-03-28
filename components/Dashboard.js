import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import Player from "./Player";
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";
import Body from "./Body";
import Right from "./Right";

//instantiate the spotify Api with client ID
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Dashboard = () => {
  //set up use of nex auth session
  const { data: session } = useSession();
  const { accessToken } = session;

  //get playing track state in order to start the music player
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  //functon to change track on music player when chosen by user
  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  //check if accessToken is valid and set it
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <main className="bg-white flex">
      <Sidebar />
      <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
      <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} /> 

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
}

export default Dashboard;