import { Card, CardContent, Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
};

export function StatCard({ title, value, icon, color = "#4f46e5" }: Props) {
  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              component="span"
              sx={{
                display: "block",
                fontSize: 12,
                color: "text.secondary",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              {title}
            </Box>
            <Box
              component="span"
              sx={{
                display: "block",
                fontSize: 26,
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              {value}
            </Box>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              bgcolor: color + "18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}