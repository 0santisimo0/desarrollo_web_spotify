import { Navigate } from 'react-router-dom';
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import ManageGenres from '../components/admin/ManageGenres';
import ManageArtists from '../components/admin/ManageArtists';
import ManageSongs from '../components/admin/ManageSongs';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function AdminPage() {
  const { userProfile } = useAuth();
  const [tab, setTab] = useState(0);

  if (userProfile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        mt: 10,
        px: { xs: 2, sm: 4, md: 6 },
        pb: 6,
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          backgroundColor: "#1e1e1e",
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ color: "#fff" }}
        >
          Admin Panel
        </Typography>

        <Divider sx={{ mb: 3, bgcolor: "#2a2a2a" }} />

        <Tabs
          value={tab}
          onChange={(_e, newValue) => setTab(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 4,
            "& .MuiTab-root": {
              color: "#bbb",
            },
            "& .Mui-selected": {
              color: "#1db954",
              fontWeight: "bold",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#1db954",
            },
          }}
        >
          <Tab label="Genres" />
          <Tab label="Artists" />
          <Tab label="Songs" />
        </Tabs>

        {tab === 0 && <ManageGenres />}
        {tab === 1 && <ManageArtists />}
        {tab === 2 && <ManageSongs />}
      </Paper>
    </Box>
  );
}

export default AdminPage;
