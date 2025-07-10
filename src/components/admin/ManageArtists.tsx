import { useEffect, useState } from "react";
import { listenArtistsByGenre } from "../../services/artistService";
import { Artist, Genre } from "../../utils/types";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { listenGenres } from "../../services/genreService";
import AddArtistDialog from "./AddArtistDialog";

function ManageArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = listenGenres((genres) => {
      setGenres(genres);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (selectedGenre) {
      unsubscribe = listenArtistsByGenre(selectedGenre, setArtists);
    } else {
      setArtists([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedGenre]);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ mb: 2, ml: 2 }}
        onClick={() => setOpenDialog(true)}
      >
        Add New Artist
      </Button>
      <Select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        displayEmpty
        sx={{ mb: 2, width: 200 }}
      >
        <MenuItem value="">
          <em>Select Genre</em>
        </MenuItem>
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>

      <List>
        {artists.map((artist) => (
          <ListItem key={artist.id}>
            <ListItemText primary={artist.name} />
            <Button>Edit</Button>
            <Button color="error">Delete</Button>
          </ListItem>
        ))}
      </List>

      <AddArtistDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}

export default ManageArtists;
