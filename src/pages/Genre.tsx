import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Artist } from "../utils/types";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { PageRoutes } from "../utils/pageRoutes";
import { listenArtistsByGenre } from "../services/artistService";

function GenrePage() {
  const { genreId } = useParams();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (genreId) {
      unsubscribe = listenArtistsByGenre(genreId, setArtists);
      setLoading(false);
    } else {
      setArtists([]);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [genreId]);

  if (loading) return <CircularProgress />;

  return (
    <Container style={{ paddingTop: 48 }}>
      <Grid container spacing={2} mt={4}>
        {artists.map((artist) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={artist.id}>
            <Card
              component={Link}
              to={`${PageRoutes.ARTIST}/${artist.id}`}
              sx={{ textDecoration: "none" }}
            >
              <CardMedia image={artist.imageUrl} sx={{ height: 140 }} />
              <CardContent>
                <Typography variant="h6">{artist.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default GenrePage;
