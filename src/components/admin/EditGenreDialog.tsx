import { useState } from "react";
import { Genre } from "../../utils/types";
import { updateGenre } from "../../services/genreService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface EditProps {
  open: boolean;
  onClose: () => void;
  genre: Genre;
}

function EditGenreDialog({ open, onClose, genre }: EditProps) {
  const [name, setName] = useState(genre.name);

  const handleSubmit = async () => {
    if (!name) return;
    try {
      await updateGenre(genre.id, { name });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Genre</DialogTitle>
      <DialogContent>
        <TextField
          label="Genre Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2, mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditGenreDialog;
