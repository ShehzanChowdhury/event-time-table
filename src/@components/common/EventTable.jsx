import React, { useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VenueBar from "./VenueBar";

/**
 * EventTable - Main timetable component that displays venues and time slots
 * @param {Array} venues - Array of venue objects
 * @param {number} startHour - Starting hour for time slots
 * @param {number} endHour - Ending hour for time slots
 * @param {number} intervalMinutes - Interval between time slots
 * @param {number} venueWidth - Width of each venue column
 * @param {number} slotHeight - Height of each time slot row
 * @param {number} timeColumnWidth - Width of the time column
 */
export default function EventTable({
  venues = [],
  startHour = 0,
  endHour = 24,
  intervalMinutes = 15,
  venueWidth = 200,
  slotHeight = 60,
  timeColumnWidth = 100,
}) {
  // Calculate time slot positions
  const timeSlots = useMemo(() => {
    const slots = [];
    const totalMinutes = (endHour - startHour) * 60;
    const numSlots = Math.floor(totalMinutes / intervalMinutes);

    for (let i = 0; i < numSlots; i++) {
      const minutes = startHour * 60 + i * intervalMinutes;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const timeString = `${String(hours).padStart(2, "0")}:${String(
        mins
      ).padStart(2, "0")}`;
      slots.push(timeString);
    }

    return slots;
  }, [startHour, endHour, intervalMinutes]);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "auto",
        border: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
        position: "relative",
        maxHeight: "100vh", // Ensure scrolling container
      }}
    >
      <Table
        sx={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "separate",
        }}
      >
        <TableHead
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backgroundColor: "#f5f5f5",
            "& .MuiTableCell-root": {
              backgroundColor: "inherit",
            },
          }}
        >
          <VenueBar
            venues={venues}
            venueWidth={venueWidth}
            timeColumnWidth={timeColumnWidth}
          />
        </TableHead>
        <TableBody>
          {timeSlots.map((time, rowIndex) => (
            <TableRow key={rowIndex}>
              {/* Time slot cell - sticky */}
              <TableCell
                sx={{
                  width: `${timeColumnWidth}px`,
                  minWidth: `${timeColumnWidth}px`,
                  height: `${slotHeight}px`,
                  padding: "8px 12px",
                  borderRight: "2px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor: "#fafafa",
                  position: "sticky",
                  left: 0,
                  zIndex: 10,
                  verticalAlign: "middle",
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
              {/* Venue cells */}
              {venues.map((venue) => (
                <TableCell
                  key={venue.id}
                  sx={{
                    width: `${venueWidth}px`,
                    minWidth: `${venueWidth}px`,
                    height: `${slotHeight}px`,
                    borderRight: "1px solid #e0e0e0",
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: rowIndex % 2 === 0 ? "#ffffff" : "#fafafa",
                    position: "relative",
                    padding: 0,
                  }}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
