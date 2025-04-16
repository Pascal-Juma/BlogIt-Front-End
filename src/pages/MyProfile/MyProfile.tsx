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
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import apiUrl from "../../utils/apiUrl";

const ProfileCta = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: "1.5rem",
  fontFamily: "var(--primary-font)",
  fontWeight: 400,
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&hover": {
    backgroundColor: blue[700],
  },
}));

function MyProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [validity, setValidity] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isLoading, data, isError, error  } = useQuery({
    queryKey: ["fetch-account"],
    queryFn: async () => {
        const response = await axios.get(`${apiUrl}/auth/myprofile`, {withCredentials: true})
        return response.data;
    }
  })


    const { isPending, mutate} = useMutation({
      mutationKey: ["manage-user"],
      mutationFn: async () => {
        const response = await axios.patch(
          `${apiUrl}/auth/myprofile`,
          { firstName,
            lastName,
            emailAddress,
            username,
            oldpass,
            newpass,
            confirmed, },
          { withCredentials: true }
        );
        return response.data;
      },
      onSuccess: () => {
        navigate("/signin");
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
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmailAddress(data.emailAddress);
          setUsername(data.username);
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

      function handleManage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setValidity(null);
        if (!firstName || !lastName || !emailAddress || !username || !oldpass || !newpass || !confirmed) {
          setValidity("All fields are required.");
          return;
        }
        if (newpass !== confirmed) {
          setValidity(`New Password and Confirm Password must match`);
          return;
        }
        mutate();
      }

  return (
    <>
      <NavBar />
      <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
        <Card
          component="form"
          onSubmit={handleManage}
          variant="outlined"
          sx={{ maxWidth: 500, padding: 2 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "var(--color-black)",
              fontSize: "2rem",
              fontWeight: "600",
              fontFamily: "var(--prime-font)",
              textAlign: "center",
              mb: 2,
            }}
          >
            Manage Your Details
          </Typography>
          {validity && (
            <Alert severity="error" sx={{ mb: 1, fontSize: "1.3rem" }}>
              {validity}
            </Alert>
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="First Name"
              variant="filled"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ mb: 2, width: 230 }}
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
              label="Last Name"
              value={lastName}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              variant="filled"
              sx={{ mb: 2, width: 230 }}
              slotProps={{
                inputLabel: {
                  sx: {
                    fontSize: "1.4rem",
                    fontWeight: "300",
                  },
                },
              }}
            />
          </Box>
          <TextField
            label="Email Address"
            value={emailAddress}
            type="email"
            onChange={(e) => setEmailAddress(e.target.value)}
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
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
            label="Username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
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
            label="Old Password"
            type="password"
            value={oldpass}
            onChange={(e) => setOldpass(e.target.value)}
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
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
            label="New Password"
            type="password"
            value={newpass}
            onChange={(e) => setNewpass(e.target.value)}
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
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
            label="Confirm Password"
            value={confirmed}
            onChange={(e) => setConfirmed(e.target.value)}
            type="password"
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
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
            <ProfileCta
              variant="contained"
              type="submit"
              disabled={isPending}
              sx={{ textTransform: "capitalize", textAlign: "center" }}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </ProfileCta>
          </Box>
        </Card>
      </Stack>
    </>
  );
}

export default MyProfile;
