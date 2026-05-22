import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Alert } from "@mui/material";
import { loginSchema, LoginSchema } from "../../lib/zod/auth.schema";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setError("");
      await login(data);
      navigate("/");
    } catch (e: unknown) {
      setError((e as { message?: string })?.message ?? "Login failed");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {error && <Alert severity="error" sx={{ fontSize: 13 }}>{error}</Alert>}
      <TextField label="Email" type="email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
      <TextField label="Password" type="password" fullWidth {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ py: 1.2 }}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </Box>
  );
}