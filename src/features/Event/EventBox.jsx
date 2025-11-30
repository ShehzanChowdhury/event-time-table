import React from "react";
import { Paper, Typography } from "@mui/material";

/**
 * Helper function to darken a color for hover effect
 */
const darkenColor = (hex, percent = 15) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - percent);
  const g = Math.max(0, ((num >> 8) & 0xff) - percent);
  const b = Math.max(0, (num & 0xff) - percent);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

/**
 * Calculate positioning styles for the event box
 */
const getPositionStyles = ({
  fillCell,
  isMultiVenue,
  isSingleSlot,
  top,
  left,
  width,
  height,
}) => {
  const margin = fillCell ? 0 : 2;
  const minHeight = 20;

  if (fillCell) {
    return {
      top: 0,
      left: 0,
      width: isMultiVenue ? `${width}px` : "100%",
      height: isSingleSlot ? "100%" : `${height}px`,
    };
  }

  return {
    top: `${top + margin}px`,
    left: `${left + margin}px`,
    width: `${width - margin * 2}px`,
    height: `${Math.max(height - margin * 2, minHeight)}px`,
  };
};

/**
 * EventBox - Displays a booked event in the timetable
 * @param {Object} event - Event object with name, startTime, endTime
 * @param {number} top - Top position in pixels
 * @param {number} height - Height in pixels
 * @param {number} left - Left position in pixels
 * @param {number} width - Width in pixels
 * @param {boolean} fillCell - If true, event fills the entire cell without margins
 * @param {boolean} isSingleSlot - If true and fillCell is true, uses 100% height instead of pixel height
 * @param {string} color - Background color for the event box (hex color)
 * @param {boolean} isMultiVenue - If true, event spans multiple venues
 */
export default function EventBox({
  event,
  top,
  height,
  left,
  width,
  fillCell = false,
  isSingleSlot = false,
  color,
  isMultiVenue = false,
}) {
  const backgroundColor = color || "#1976d2";
  const hoverColor = darkenColor(backgroundColor, 20);
  const positionStyles = getPositionStyles({
    fillCell,
    isMultiVenue,
    isSingleSlot,
    top,
    left,
    width,
    height,
  });

  return (
    <Paper
      elevation={2}
      sx={{
        position: "absolute",
        ...positionStyles,
        boxSizing: "border-box",
        backgroundColor,
        border: "2px solid rgb(0, 0, 0)",
        padding: "6px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        "&:hover": {
          backgroundColor: hoverColor,
          transform: "translateY(-1px)",
          boxShadow: (theme) => theme.shadows[4],
        },
        zIndex: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          opacity: 0.95,
          lineHeight: 1.2,
          fontWeight: 400,
          textAlign: "center",
          width: "100%",
        }}
      >
        {event.startTime} - {event.endTime}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          lineHeight: 1.3,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          mb: 0.25,
          textAlign: "center",
          width: "100%",
        }}
      >
        {event.name}
      </Typography>
    </Paper>
  );
}
