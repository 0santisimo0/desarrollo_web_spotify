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
import { createSong } from "../../services/songService";
import { Artist } from "../../utils/types";
import { listenArtists } from "../../services/artistService";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

interface Props {
  open: boolean;
  onClose: () => void;
}

function AddSongDialog({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribeArtists = listenArtists(
      setArtists
    );
    return () => unsubscribeArtists();
  }, []);

  const handleSubmit = async () => {
    if (!name || !mp3File || !selectedArtist) return;
    setLoading(true);
    try {
      const mp3Url = await uploadToCloudinary(mp3File);

      if (!mp3Url) {
        throw new Error("La subida a Cloudinary falló");
      }

      await createSong({ name, mp3Url, artistId: selectedArtist });

      await createSong({ name, mp3Url, artistId: selectedArtist });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Song</DialogTitle>
      <DialogContent>
        <TextField
          label="Song Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2, mt: 2}}
        />
        <Select
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
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
        <Button variant="contained" component="label">
          Upload MP3
          <input
            type="file"
            hidden
            accept="audio/*"
            onChange={(e) => setMp3File(e.target.files?.[0] || null)}
          />
        </Button>
        {mp3File && <div style={{ marginTop: 8 }}>{mp3File.name}</div>}
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

export default AddSongDialog;
