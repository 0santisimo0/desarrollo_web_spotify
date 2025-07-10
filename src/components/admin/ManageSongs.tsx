import { useEffect, useState } from "react";
import { listenSongsByArtist } from "../../services/songService";
import { listenArtistsByGenre } from "../../services/artistService";
import { Artist, Song } from "../../utils/types";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import AddSongDialog from "./AddSongDialog";

function ManageSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const unsubscribeArtists = listenArtistsByGenre(
      "default-genre",
      setArtists
    );
    return () => unsubscribeArtists();
  }, []);

  useEffect(() => {
    let unsubscribeSongs: (() => void) | undefined;

    if (selectedArtist) {
      unsubscribeSongs = listenSongsByArtist(selectedArtist, setSongs);
    } else {
      setSongs([]);
    }

    return () => {
      if (unsubscribeSongs) unsubscribeSongs();
    };
  }, [selectedArtist]);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ mb: 2, ml: 2 }}
        onClick={() => setOpenDialog(true)}
      >
        Add New Song
      </Button>
      <Select
        value={selectedArtist}
        onChange={(e) => setSelectedArtist(e.target.value)}
        displayEmpty
        sx={{ mb: 2, width: 200 }}
      >
        <MenuItem value="">
          <em>Select Artist</em>
        </MenuItem>
        {artists.map((artist) => (
          <MenuItem key={artist.id} value={artist.id}>
            {artist.name}
          </MenuItem>
        ))}
      </Select>

      <List>
        {songs.map((song) => (
          <ListItem key={song.id}>
            <ListItemText primary={song.name} />
            <Button>Edit</Button>
            <Button color="error">Delete</Button>
          </ListItem>
        ))}
      </List>
      <AddSongDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}

export default ManageSongs;
