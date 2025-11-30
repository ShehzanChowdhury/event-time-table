import React from "react";
import { TableCell, Typography } from "@mui/material";

/**
 * TimeSlotCell - Displays a time slot label in the table
 * @param {string} time - Time string in "HH:MM" format
 * @param {number} timeColumnWidth - Width of the time column
 * @param {number} slotHeight - Height of the time slot row
 */
export default function TimeSlotCell({ time, timeColumnWidth, slotHeight }) {
  return (
    <TableCell
      sx={{
        width: `${timeColumnWidth}px`,
        maxWidth: `${timeColumnWidth}px`,
        height: `${slotHeight}px`,
        maxHeight: `${slotHeight}px`,
        minHeight: `${slotHeight}px`,
        padding: "8px 12px",
        borderRight: "2px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fafafa",
        position: "sticky",
        left: 0,
        zIndex: 10,
        verticalAlign: "middle",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.75rem",
          color: "#666",
          fontWeight: 500,
        }}
      >
        {time}
      </Typography>
    </TableCell>
  );
}
