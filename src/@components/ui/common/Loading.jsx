import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * Loading - Simple loading component
 */
export default function Loading({ message = "Loading events..." }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
