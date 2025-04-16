import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps}  from "@mui/material/Button";
import { styled }from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import apiUrl from "../../utils/apiUrl";

const SignUpCta = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: '1.5rem',
  fontFamily: 'var(--primary-font)',
  fontWeight: 400,
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&hover': {
    backgroundColor: blue[700],
  }
}));

const SignInCta = styled(Button)<ButtonProps>(() => ({
    fontSize: '1.5rem',
    fontFamily: 'var(--primary-font)',
    fontWeight: 400,
    color: blue[500],
    '&hover': {
      backgroundColor: blue[700],
    }
  }));

function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/signin`,
        {identifier, password}, {withCredentials: true}
      );
      return response.data;
    },
    onSuccess: () => {
      navigate("/blogs");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message || "An Error Occurred.";
        setFormError(serverMessage);
      } else {
        setFormError("Something went wrong. Please try again later.");
      }
    }
  });

  function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    mutate();
    }

  return (
    <>
      <Header />
      <Stack direction="row" justifyContent="center" alignItems="center" mt={4}>
        <Card
          component="form"
          onSubmit={handleSignIn}
          variant="outlined"
          sx={{ maxWidth: 500, width: 500, padding: 4 }}
        >
          <Typography variant="body1" sx={{color: "var(--color-black)", textAlign: 'center', fontSize: "3rem", fontWeight: "500", mb: 2}}>
            Signin to your account
          </Typography>
          {
              formError && <Alert severity="error" sx={{mb: 1, fontSize: '1.3rem'}}>{formError}</Alert>
          }
          <Box sx={{ display: 'flex', gap: 2
          }}>
          </Box>
          <TextField label="Username or Email Address"
          value={identifier}
          type="text"
          onChange={(e) => setIdentifier(e.target.value)}
          variant="filled" fullWidth sx={{mb: 2}}       
            slotProps={{
            inputLabel: {
              sx: {
                fontSize: '1.4rem',
                fontWeight: '300',
              },
            },
          }}/>
          <TextField label="Password" type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           variant="filled" fullWidth sx={{mb: 2}}          slotProps={{
            inputLabel: {
              sx: {
                fontSize: '1.4rem',
                fontWeight: '300',
              },
            },
          }}/>
          <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <SignUpCta variant="contained" type="submit"  disabled={isPending} sx={{ textTransform:  'capitalize', textAlign: 'center'}}>
            {
              isPending ? "Please wait..." : "Sign In"
            }
          </SignUpCta>
          </Box>
            <Typography variant="body1" sx={{color: "var(--color-black)", fontSize: "1.8rem", fontWeight: "300", mt: 1, textAlign: 'center'}}>
                Don't have an account?           
                <SignInCta variant="text"  component="a" href="/signup" sx={{ textTransform:  'capitalize', textAlign: 'center'}}>Sign Up
                </SignInCta>
            </Typography>
        </Card>
      </Stack>
    </>
  );
}

export default SignIn;
