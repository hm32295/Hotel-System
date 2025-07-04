import * as React from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const password = watch("password");

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
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
            Sign up
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            If you don't have an account register
            <br />
            You can{" "}
            <Link to="/register" style={{ color: "#3f51b5", fontWeight: 600 }}>
              Register Now!
            </Link>
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                mt: 1,
                backgroundColor: "#3f51b5",
                boxShadow: 2,
              }}
            >
              Sign in
            </Button>
            <Typography variant="body2" sx={{ mb: 3 }}>
              <Link
                to="/forget"
                style={{
                  color: "#4D4D4D",
                  fontWeight: 300,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                Forget Password?
              </Link>
            </Typography>
          </Box>
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
            src="/src/assets/images/Rectangle 7 (1).svg"
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
