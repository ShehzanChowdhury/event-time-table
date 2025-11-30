import React from "react";
import { Box, Paper, Typography } from "@mui/material";

/**
 * EventBox - Displays a booked event in the timetable
 * @param {Object} event - Event object with name, startTime, endTime
 * @param {number} top - Top position in pixels
 * @param {number} height - Height in pixels
 * @param {number} left - Left position in pixels
 * @param {number} width - Width in pixels
 */
export default function EventBox({ event, top, height, left, width }) {
  // Calculate margins for spacing from cell borders
  const margin = 2;
  const minHeight = 20; // Minimum height for very short events

  return (
    <Paper
      elevation={2}
      sx={{
        position: "absolute",
        top: `${top + margin}px`,
        left: `${left + margin}px`,
        width: `${width - margin * 2}px`,
        height: `${Math.max(height - margin * 2, minHeight)}px`,
        backgroundColor: (theme) => theme.palette.primary.main,
        color: "#ffffff",
        borderRadius: 1,
        padding: "6px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        "&:hover": {
          backgroundColor: (theme) => theme.palette.primary.dark,
          transform: "translateY(-1px)",
          boxShadow: (theme) => theme.shadows[4],
        },
        zIndex: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.75rem",
          fontWeight: 600,
          lineHeight: 1.3,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          mb: 0.25,
        }}
      >
        {event.name}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.7rem",
          opacity: 0.95,
          lineHeight: 1.2,
          fontWeight: 400,
        }}
      >
        {event.startTime} - {event.endTime}
      </Typography>
    </Paper>
  );
}
