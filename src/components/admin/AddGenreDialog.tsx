import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { createGenre } from "../../services/genreService";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

interface Props {
  open: boolean;
  onClose: () => void;
}

function AddGenreDialog({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !imageFile) return;
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(imageFile, "image", "genres");

      if (!imageUrl) throw new Error("La subida a Cloudinary falló");

      await createGenre({ name, imageUrl });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", mt: 1 }}>
        🎵 Add New Genre
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <TextField
            label="Genre Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </Button>

          {imageFile && (
            <Typography variant="body2" color="text.secondary">
              Selected: <strong>{imageFile.name}</strong>
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddGenreDialog;
