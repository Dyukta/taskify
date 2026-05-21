import { Box, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { RegisterForm } from "../components/forms/RegisterForm";

export default function Register() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8fafc",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          border: "1px solid #e2e8f0",
          borderRadius: 3,
        }}
      >
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Box
            component="span"
            sx={{ display: "block", fontWeight: 700, fontSize: 22, color: "primary.main", mb: 0.5 }}
          >
            Taskify
          </Box>
          <Box component="span" sx={{ display: "block", fontWeight: 600, fontSize: 17 }}>
            Create your account
          </Box>
          <Box
            component="span"
            sx={{ display: "block", fontSize: 13, color: "text.secondary", mt: 0.5 }}
          >
            Start managing your work
          </Box>
        </Box>

        <RegisterForm />

        <Box
          component="p"
          sx={{
            fontSize: 13,
            color: "text.secondary",
            textAlign: "center",
            mt: 2.5,
          }}
        >
          Already have an account?{" "}
          <RouterLink
            to="/login"
            style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}
          >
            Sign in
          </RouterLink>
        </Box>
      </Paper>
    </Box>
  );
}