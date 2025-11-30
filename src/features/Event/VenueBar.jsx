import React from "react";
import { TableRow, TableCell, Typography } from "@mui/material";

/**
 * VenueBar - Displays a sticky table header row with venues
 * @param {Array} venues - Array of venue objects with id and name
 * @param {number} venueWidth - Width of each venue column in pixels
 * @param {number} timeColumnWidth - Width of the time column in pixels
 */
export default function VenueBar({
  venues = [],
  venueWidth = 200,
  timeColumnWidth = 100,
}) {
  return (
    <TableRow
      sx={{
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Blank first cell*/}
      <TableCell
        sx={{
          width: `${timeColumnWidth}px`,
          maxWidth: `${timeColumnWidth}px`,
          padding: "12px 16px",
          borderRight: "2px solid #e0e0e0",
          borderBottom: "2px solid #e0e0e0",
          backgroundColor: "#f5f5f5",
          position: "sticky",
          left: 0,
          zIndex: 101,
          boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        }}
      />
      {/* Venue header cells */}
      {venues.map((venue) => (
        <TableCell
          key={venue.id}
          sx={{
            width: `${venueWidth}px`,
            maxWidth: `${venueWidth}px`,
            padding: "12px 16px",
            borderRight: "1px solid #e0e0e0",
            borderBottom: "2px solid #e0e0e0",
            backgroundColor: "#ffffff",
            textAlign: "center",
            fontWeight: 600,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 100,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {venue.name}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}
