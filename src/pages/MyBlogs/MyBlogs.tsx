import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Button, { ButtonProps} from '@mui/material/Button';
import { styled }from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import apiUrl from "../../utils/apiUrl";
import NavBar from "../../components/NavBar/NavBar";
import BlogCard from "../../components/BlogCard/BlogCard";


const BlogsCta = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: '1.5rem',
  fontFamily: 'var(--primary-font)',
  fontWeight: 400,
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&hover': {
    backgroundColor: blue[700],
  }
}));

type BlogEntry = {
    id: string;
    title: string;
    description: string;
    isPinned: boolean;
  }
  

function Myblogs() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { isLoading, isError, error, data } = useQuery<BlogEntry[]>({
    queryKey: ["published-blogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/entries`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

    useEffect(() => {
        if (axios.isAxiosError(error)) {
        const serverMessage =
            error.response?.data.message || "An error occurred";
        setFetchError(serverMessage);
        } else {
        setFetchError("Something went wrong. Please try again later.");
        }
    }, [error]);

  if (isLoading) {
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
    </Box>;
  }

  if (isError) {
    return (
      <Typography variant="h2" fontWeight="400" mt={10} textAlign="center">
        {fetchError}
      </Typography>
    );
  }

  return (
    <>
      <NavBar />
      {!isLoading && !isError && data && data.length === 0 && (
          <Box textAlign="center" mt={6}>
            <Typography variant="h2" fontFamily="var(--prime-font)" fontWeight={500} gutterBottom>
              No Blog content yet.
            </Typography>
            <BlogsCta
              variant="contained"
              component="a" href="/compose"
              sx={{ mt: 2 }}
            >
             {
              isLoading ? "Loading..." : "Compose one"
             }
            </BlogsCta>
          </Box>
        )}
        <Grid container alignItems="center" direction="column" mt={8} >
            {
                data && 
                data.map((item) =>
                <Grid size={{ xs: 11, md: 8, lg: 6 }}>
                    <BlogCard
                    title={item.title}
                description={item.description}
            entryPinned={item.isPinned}
        id={item.id} />
                </Grid>)
            }
        </Grid>
    </>
  );
}

export default Myblogs;
