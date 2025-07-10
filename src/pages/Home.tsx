import { useEffect, useState } from "react";
import { listenGenres } from "../services/genreService";
import { Genre } from "../utils/types";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { PageRoutes } from "../utils/pageRoutes";

function HomePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenGenres((genres) => {
      setGenres(genres);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <Container sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );

  return (
    <Container sx={{ paddingTop: 10 }}>
      <Grid container spacing={3}>
        {genres.map((genre) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={genre.id}>
            <Link
              to={`${PageRoutes.GENRE}/${genre.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* Imagen cuadrada y centrada */}
                <CardMedia
                  image={genre.imageUrl}
                  title={genre.name}
                  sx={{
                    width: "100%",
                    pt: "100%", // relación 1:1 (cuadrado)
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Nombre del género */}
                <CardContent
                  sx={{
                    backgroundColor: "#1e1e1e",
                    color: "white",
                    textAlign: "center",
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                    {genre.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
