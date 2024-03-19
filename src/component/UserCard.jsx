import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Stack,
  Box,
} from "@mui/material";
import UserCard from "./UserCard";

function GithubSearch() {
  const [query, setQuery] = useState("Tamannatanwa");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}`
      );
      const data = await response.json();
      setResults(data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ bgcolor: "secondary.main", p: 2, m: 1, borderRadius: 1 }}>
        <Typography variant="h4" color="white" textAlign="center">
          Github User Search
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row">
            <TextField
              label="Search for a GitHub user..."
              variant="outlined"
              sx={{ border: "4px solid black" }}
              value={query}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Search User
            </Button>
          </Stack>
        </form>
        <UserCard data={results} />
      </Box>
    </Container>
  );
}

export default GithubSearch;
