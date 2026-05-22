import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Alert } from "@mui/material";
import { registerSchema, RegisterSchema } from "../../lib/zod/auth.schema";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setError("");
      await registerUser(data);
      navigate("/");
    } catch (e: unknown) {
      setError((e as { message?: string })?.message ?? "Registration failed");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {error && <Alert severity="error" sx={{ fontSize: 13 }}>{error}</Alert>}
      <TextField label="Name" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
      <TextField label="Email" type="email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
      <TextField label="Password" type="password" fullWidth {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ py: 1.2 }}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </Box>
  );
}