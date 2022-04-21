import * as React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import react, { useEffect } from "react";

export default function EmailConfirm() {
  const router = useRouter();

  const { token } = router.query;

  console.log(token);

  useEffect(() => {
    sendToken(token);
  }, [token]);

  const sendToken = async (token) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(`/api/user/email/${token}`, {}, config);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Confirm Email
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="conPassword"
              label="Confirm Password"
              name="conPassword"
              type="password"
              autoComplete="email"
              autoFocus
            /> */}

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "secondary.main" }}
            >
              Submit
            </Button> */}
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
