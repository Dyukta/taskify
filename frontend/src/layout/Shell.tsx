import { ReactNode } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <Header />
        <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}