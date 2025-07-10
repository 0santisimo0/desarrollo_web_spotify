import { useEffect, useState } from "react";
import { deleteGenre, listenGenres } from "../../services/genreService";
import { Genre } from "../../utils/types";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import AddGenreDialog from "./AddGenreDialog";
import EditGenreDialog from "./EditGenreDialog";

function ManageGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editGenre, setEditGenre] = useState<Genre | null>(null);

  useEffect(() => {
    const unsubscribe = listenGenres(setGenres);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpenDialog(true)}
      >
        Add New Genre
      </Button>
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.id}>
            <ListItemText primary={genre.name} />
            <Button onClick={() => setEditGenre(genre)}>Edit</Button>
            <Button
              color="error"
              onClick={async () => {
                if (
                  window.confirm("Are you sure you want to delete this genre?")
                ) {
                  await deleteGenre(genre.id);
                }
              }}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <AddGenreDialog open={openDialog} onClose={() => setOpenDialog(false)} />
      {editGenre && (
        <EditGenreDialog
          open={!!editGenre}
          onClose={() => setEditGenre(null)}
          genre={editGenre}
        />
      )}
    </div>
  );
}

export default ManageGenres;
