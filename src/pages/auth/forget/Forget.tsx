import * as React from "react";
import { Grid, Box, TextField, Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Forget() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Grid
      container
      sx={{ minHeight: "100vh" }}
      alignItems="center"
      justifyContent="center"
    >
      {/*  Left Side (Form) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 0 },
        }}
      >
        <Box sx={{ justifySelf: "start", alignSelf: "start" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mt: { xs: 2, md: 10 },
              ml: { xs: 0, md: -7 },
            }}
          >
            <span style={{ color: "#3f51b5" }}>Stay</span>cation.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            justifySelf: "start",
            alignSelf: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 3, mb: 3 }}>
            Forget Password
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            If you already have an account login
            <br />
            You can{" "}
            <Link to="/login" style={{ color: "red", fontWeight: 600 }}>
              Login here !
            </Link>
          </Typography>

          <TextField
            label="Email Address"
            type="email"
            fullWidth
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              mt: 5,
              backgroundColor: "#3f51b5",
              boxShadow: 2,
            }}
          >
            Send Mail
          </Button>
        </Box>
      </Grid>

      {/* Right Side  */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 600, mt: { xs: 2, md: 2 } }}>
          <img
            src="/src/assets/images/SignUp.png"
            alt="signup"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
