import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { createArtist } from "../../services/artistService";
import { Genre } from "../../utils/types";
import { listenGenres } from "../../services/genreService";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

interface Props {
  open: boolean;
  onClose: () => void;
}

function AddArtistDialog({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = listenGenres((genres) => {
      setGenres(genres);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!name || !imageFile || !selectedGenre) return;
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(imageFile, "image", "artists");
      
      if (!imageUrl) {
        throw new Error("La subida a Cloudinary falló");
      }

      await createArtist({ name, imageUrl, genreId: selectedGenre });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Artist</DialogTitle>
      <DialogContent>
        <TextField
          label="Artist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2, mt: 2 }}
        />
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
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
        <Button variant="contained" component="label">
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </Button>
        {imageFile && <div style={{ marginTop: 8 }}>{imageFile.name}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddArtistDialog;
