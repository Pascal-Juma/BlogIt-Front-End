import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from '../../components/NavBar/NavBar'

const ComposeCta = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: "1.5rem",
  fontFamily: "var(--primary-font)",
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&hover": {
    backgroundColor: blue[700],
  },
}));

function Compose() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["compose-blog"],
    mutationFn: async () => {
      const response = await axios.post(
        `http://localhost:4000/entries`,
        { title, description, content },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      navigate(`/published/${data.id}`);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message || "An Error Occurred.";
        setFormError(serverMessage);
      } else {
        setFormError("Something went wrong. Please try again later.");
      }
    },
  });

  function handleCompose(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    if (!title || !description || !content){
      setFormError("All fields are required.");
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
          onSubmit={handleCompose}
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
            Compose — Unleash your story
          </Typography>
          {formError && (
            <Alert severity="error" sx={{ mb: 1, fontSize: "1.3rem" }}>
              {formError}
            </Alert>
          )}
          <Box sx={{ display: "flex", gap: 2 }}></Box>
          <TextField
            label="Enter your Blog Title"
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
            label="Enter your Blog description"
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
            label="Write your content here(markdown is also supported)"
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
            <ComposeCta
              variant="contained"
              type="submit"
              disabled={isPending}
              sx={{ textTransform: "capitalize", textAlign: "center" }}
            >
              {isPending ? "Please wait..." : "Publish"}
            </ComposeCta>
          </Box>
        </Card>
      </Stack>
    </>
  );
}

export default Compose;
