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

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/register`,
        {firstName, lastName, emailAddress, username, password, confirmed},
      )
      return response.data;
    },
    onSuccess: () => {
    navigate("/signin")
    },
    onError: (err) => {
      if(axios.isAxiosError(err)){
        const serverMessage = err.response?.data?.message || "An Error Occured.";
        setFormError(serverMessage);
      }else{
        setFormError("Something went wrong. Please try again later.");
      }
    }
  })

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    console.log({firstName, lastName, emailAddress, username, password, confirmed});
    if(password !== confirmed) {
      setFormError(`Password and Confirm Password must match`)
      return;
    }mutate();
  }
  return (
    <>
      <Header />
      <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
        <Card
          component="form"
          onSubmit={handleRegister}
          variant="outlined"
          sx={{ maxWidth: 500, padding: 2 }}
        >
          <Typography variant="body1" sx={{color: "var(--color-black)", fontSize: "2rem", fontWeight: "500", mb: 2}}>
            Create an Account and start sharing your stories.
          </Typography>
          {
              formError && <Alert severity="error" sx={{mb: 1, fontSize: '1.3rem'}}>{formError}</Alert>
          }
          <Box sx={{ display: 'flex', gap: 2
          }}>
          <TextField label="First Name" 
          variant="filled" 
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{mb: 2, width: 230}}
          slotProps={{
            inputLabel: {
              sx: {
                fontSize: '1.4rem',
                fontWeight: '300',
              },
            },
          }}/>
          <TextField label="Last Name"
          value={lastName}
          type="text"
          onChange={(e) => setLastName(e.target.value)}
           variant="filled" sx={{mb: 2, width: 230}}          slotProps={{
            inputLabel: {
              sx: {
                fontSize: '1.4rem',
                fontWeight: '300',
              },
            },
          }}/>
          </Box>
          <TextField label="Email Address"
          value={emailAddress}
          type="email"
          onChange={(e) => setEmailAddress(e.target.value)}
           variant="filled" fullWidth sx={{mb: 2}}          slotProps={{
            inputLabel: {
              sx: {
                fontSize: '1.4rem',
                fontWeight: '300',
              },
            },
          }}/>
          <TextField label="Username" 
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          variant="filled" fullWidth sx={{mb: 2}}          slotProps={{
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
          <TextField label="Confirm Password" 
          value={confirmed}
          onChange={(e) => setConfirmed(e.target.value)}
          type="password" variant="filled" fullWidth sx={{mb: 2}}          slotProps={{
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
              isPending ? "Please wait..." : "Create Account"
            }
          </SignUpCta>
          </Box>
            <Typography variant="body1" sx={{color: "var(--color-black)", fontSize: "1.8rem", fontWeight: "300", mt: 1, textAlign: 'center'}}>
                Already have an account?           
                <SignInCta variant="text"  component="a" href="/signin" sx={{ textTransform:  'capitalize', textAlign: 'center'}}>Sign In
                </SignInCta>
            </Typography>
        </Card>
      </Stack>
    </>
  );
}

export default Register;
