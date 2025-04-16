import {
  Card,
  Typography,
  Button,
  ButtonProps,
  Stack,
  TextField,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import apiUrl from "../../utils/apiUrl";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const RefineCta = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: "1.5rem",
  fontFamily: "var(--primary-font)",
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&hover": {
    backgroundColor: blue[700],
  },
}));

function Refine() {
  const { entryId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [validity, setValidity] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isLoading, data, isError, error  } = useQuery({
    queryKey: ["fetch-blog"],
    queryFn: async () => {
        const response = await axios.get(`${apiUrl}/entries/${entryId}`, {withCredentials: true})
        return response.data;
    }
  })
    

  const { isPending, mutate} = useMutation({
    mutationKey: ["refine-blog"],
    mutationFn: async () => {
      const response = await axios.patch(
        `${apiUrl}/entries/${entryId}`,
        { title, description, content },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      navigate(`/published/${entryId}`);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message || "An Error Occurred.";
        setValidity(serverMessage);
      } else {
        setValidity("Something went wrong. Please try again later.");
      }
    },
  }); 

  useEffect(() => {
    if(data){
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
    }
  }, [data])

  if(isError){
    return <Typography variant="h3" textAlign="center" fontWeight="400" mt={20}>
         {(error as Error)?.message || "Something went wrong. Try again Later"}
    </Typography>
  }

  if(isLoading){
    return <Box display="flex" justifyContent="center" alignItems="center" mt={50}>
        <CircularProgress />
    </Box>
  }

  function handleRefine(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidity(null);
    if (!title || !description || !content){
      setValidity("All fields are required.");
      return;
    }
    mutate();
  }

  return (
    <>
      <NavBar />
      <Stack direction="row" justifyContent="center" alignItems="center" mt={4} mb={4}>
        <Card
          component="form"
          onSubmit={handleRefine}
          variant="outlined"
          sx={{ maxWidth: 750, width: 750, padding: 4 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "var(--color-black)",
              textAlign: "center",
              fontSize: "3rem",
              fontWeight: "500",
              mb: 2,
            }}
          >
            Refine — Finalize your masterpiece
          </Typography>
          {validity && (
            <Alert severity="error" sx={{ mb: 1, fontSize: "1.3rem" }}>
              {validity}
            </Alert>
          )}
          <Box sx={{ display: "flex", gap: 2 }}></Box>
          <TextField
            label="Enter your new Blog Title"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            variant="filled"
            fullWidth
            sx={{
              mb: 2,
              "& .MuiFilledInput-input, & .MuiFilledInput-inputMultiline": {
                fontSize: "2rem", 
                lineHeight: "1.2",
                fontWeight: 400,
                color: "var(--color-red)",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            }}
            slotProps={{
              inputLabel: {
                sx: {
                  fontSize: "1.4rem",
                  fontWeight: "300",
                },
              },
            }}
          />
          <TextField
            label="Enter your new description title"
            type="text"
            value={description}
            minRows={3}
            multiline
            onChange={(e) => setDescription(e.target.value)}
            variant="filled"
            fullWidth
            sx={{
              mb: 2,
              "& .MuiFilledInput-input, & .MuiFilledInput-inputMultiline": {
                fontSize: "1.8rem", 
                lineHeight: "1.1",
                fontWeight: 300,
                color: "var(--color-black)",
                fontStyle: "italic",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            }}
            slotProps={{
              inputLabel: {
                sx: {
                  fontSize: "1.4rem",
                  fontWeight: "300",
                },
              },
            }}
          />
          <TextField
            label="Write your new content here(markdown is also supported)"
            type="text"
            value={content}
            minRows={10}
            multiline
            onChange={(e) => setContent(e.target.value)}
            variant="filled"
            fullWidth
            sx={{
              mb: 2, 
              "& .MuiFilledInput-input, & .MuiFilledInput-inputMultiline": {
                fontSize: "1.6rem", 
                lineHeight: "1.1",
                fontWeight: 400,
                color: "var(--color-black)",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            }}
            slotProps={{
              inputLabel: {
                sx: {
                  fontSize: "1.4rem",
                  fontWeight: "300",
                },
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RefineCta
              variant="contained"
              type="submit"
              disabled={isPending}
              sx={{ textTransform: "capitalize", textAlign: "center" }}
            >
              {isPending ? "Please wait..." : "Refine"}
            </RefineCta>
          </Box>
        </Card>
      </Stack>
    </>
  );
}

export default Refine;
