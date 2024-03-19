import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Container,
  Box,
  Stack,
  Card,
  Paper,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function GithubSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setResults([])
    setQuery("");
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
      <Box>
        <Box bgcolor="pink" padding="2rem" borderRadius="5px">
          <Typography variant="h4" color="red" marginBottom="2rem">
            GitHub User Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" alignItems="center">
              <TextField
                label="Search for a GitHub user..."
                variant="outlined"
                value={query}
                onChange={handleChange}
                sx={{
                  bgcolor: "white",
                  color: "black",
                  borderRadius: 1,
                  padding: "10px",
                }}
              />
              {query && (
                <ClearIcon
                  onClick={handleClear}
                  sx={{ cursor: "pointer", color: "gray", fontSize: "1.5rem",bgcolor: "skyblue",borderRadius: 1,padding: "10px"}}
                />
              )}
              <Button variant="contained" type="submit">
                Search
              </Button>
            </Stack>
          </form>
        </Box>
        <br />
        <br />
        <Card component={Paper} elevation={10}>
          {results.length > 0 ? (
            <List>
              {results.map((user) => (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <Avatar src={user.avatar_url} alt={user.login} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.login}
                    secondary={
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.html_url}
                      </a>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No results found</Typography>
          )}
        </Card>
      </Box>
    </Container>
  );
}

export default GithubSearch;
