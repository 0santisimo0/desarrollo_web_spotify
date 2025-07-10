import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listenSongsByArtist } from "../services/songService";
import { getArtistById } from "../services/artistService";
import { Song, Artist } from "../utils/types";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { logEvent } from "firebase/analytics";
import { analytics } from "../services/firebaseConfig";

function ArtistPage() {
  const { artistId } = useParams();
  const [songs, setSongs] = useState<Song[]>([]);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSongs: (() => void) | undefined;

    if (artistId) {
      getArtistById(artistId).then((fetchedArtist) => {
        if (fetchedArtist) {
          setArtist(fetchedArtist);
        } else {
          console.log("Artist not found");
        }
      });

      unsubscribeSongs = listenSongsByArtist(artistId, setSongs);
      setLoading(false);
    } else {
      setSongs([]);
      setLoading(false);
    }

    return () => {
      if (unsubscribeSongs) unsubscribeSongs();
    };
  }, [artistId]);

  useEffect(() => {
    if (artist) {
      logEvent(analytics, "view_artist", {
        artist_name: artist.name,
        artist_id: artist.id,
      });
    }
  }, [artist]);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg" style={{ paddingTop: 98 }}>
      {artist && (
        <Box
          sx={{
            position: "relative",
            height: "300px",
            backgroundImage: `url(${artist.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 4,
            marginBottom: 3,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
              color: "white",
              fontWeight: "bold",
              fontSize: "24px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h4">{artist.name}</Typography>
          </Box>
        </Box>
      )}

      <Typography variant="h5" gutterBottom>
        Songs
      </Typography>

      <List>
        {songs.map((song) => (
          <ListItem
            key={song.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <ListItemText primary={song.name} />
            <audio
              controls
              src={song.mp3Url}
              style={{ marginLeft: "1rem", width: "250px" }}
              onPlay={() => {
                logEvent(analytics, "play_song", {
                  song_name: song.name,
                  song_id: song.id,
                  artist_id: song.artistId,
                });
              }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ArtistPage;
