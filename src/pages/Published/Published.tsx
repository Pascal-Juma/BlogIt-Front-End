import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkDown from "react-markdown";
import { Box, Typography, CircularProgress, Card } from "@mui/material";
import apiUrl from "../../utils/apiUrl";
import NavBar from "../../components/NavBar/NavBar";
import "./Published.css";

function Published() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { entryId } = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["published-blog"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/entries/${entryId}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (isError && error) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data.message || "An error occurred";
        setFetchError(serverMessage);
      } else {
        setFetchError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  if (isLoading) {
    return(
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ marginLeft: 2 }}>
        Loading please wait...
      </Typography>
    </Box>
    );
  }

  if (isError || fetchError) {
    return (
      <Typography variant="h2" fontWeight="bold" textAlign="center" mt={10}>
        {fetchError || "Failed to load blog entry."}
      </Typography>
    );
  }
  
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
          marginInline: 5,
        }}
      >
        <Card sx={{ p: 3, display: "flex", alignItems: "center", marginInline: 8, justifyContent: "center", mb={5}}}>
        <div className="markdown-helper">
          <Typography  variant="h1" color="var(--color-red)" sx={{fontSize: 30, fontWeight: 400}} gutterBottom >
            {data && data.title}
          </Typography>
          <Typography variant="h4" sx={{fontSize: 28, fontWeight: 300, fontStyle: "italic"}} gutterBottom>
            {data && data.description}
          </Typography>
          <div className="markdown-styles">
          <ReactMarkDown >{data && data.content}</ReactMarkDown>
          </div>
        </div>
        </Card>
      </Box>
    </>
  );
}

export default Published;
