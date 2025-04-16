import {
  Button,
  Box,
  Card,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import { FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import { LiaPenAltSolid } from "react-icons/lia";
import { RiUnpinFill, RiPushpinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiUrl from "../../utils/apiUrl";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useState } from "react";

type cardProps = {
  title: string;
  description: string;
  id: string;
  entryPinned: boolean;
};

function BlogCard({
  title,
  description,
  id,
  entryPinned,
}: cardProps) {
  const queryClient = useQueryClient();
  const [validity, setValidity] = useState<string | null>(null);
  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-blog"],
    mutationFn: async () => {
      const response = await axios.delete(`${apiUrl}/entries/${id}`, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["published-blogs"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverMessage =
          error.response?.data?.message || "An error occurred";
        setValidity(serverMessage);
      } else {
        setValidity("Something went wrong. Please try again later.");
      }
    },
  });

  function handleDelete() {
    mutate();
  }
  return (
    <Card sx={{ mt: 3, width: "100%", p: 2 }}>
      <Typography
        variant="h2"
        textTransform="capitalize"
        fontWeight="400"
        gutterBottom
        fontSize="2.4rem"
        fontFamily="var(--secondary-font)"
      >
        {validity && (
          <Alert severity="error" sx={{ mb: 1, fontSize: "1.3rem" }}>
            {validity}
          </Alert>
        )}
        {title}
      </Typography>
      <Typography variant="body1" fontSize="1.8rem" fontWeight="400" fontFamily="var(--tertiary-font)">{description}</Typography>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<LiaPenAltSolid />}
            component={Link}
            to={`/refine/${id}`}
            sx={{ textTransform: "capitalize", p: 1.5, width: "14rem", fontSize: "1.8rem" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={isPending}
            sx={{ textTransform: "capitalize", p: 1.5, fontSize: "1.8rem"}}
            startIcon={<FaTrashAlt />}
          >
            {isPending ? "Please wait..." : "Delete"}
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          <IconButton component={Link} to={`/published/${id}`}  sx={{ textTransform: "capitalize", fontSize: "1.8rem" }}>
            <FaExternalLinkAlt />
          </IconButton>
          <IconButton  sx={{ textTransform: "capitalize",fontSize: "1.8rem"}}>
            {entryPinned ? <RiUnpinFill /> : <RiPushpinFill />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default BlogCard;
