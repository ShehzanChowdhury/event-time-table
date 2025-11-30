import React, { useMemo, useRef, useState, useEffect } from "react";
import { Box, Table, TableBody, TableHead, TableRow } from "@mui/material";
import VenueBar from "./VenueBar";
import TimeSlotCell from "./TimeSlotCell";
import VenueCell from "./VenueCell";
import { generateTimeSlots } from "../../@utils";

/**
 * EventTable - Main timetable component that displays venues and time slots
 * @param {Array} venues - Array of venue objects
 * @param {Array} events - Array of event objects
 * @param {number} startHour - Starting hour for time slots
 * @param {number} endHour - Ending hour for time slots
 * @param {number} intervalMinutes - Interval between time slots
 * @param {number} venueWidth - Width of each venue column
 * @param {number} slotHeight - Height of each time slot row
 * @param {number} timeColumnWidth - Width of the time column
 */
export default function EventTable({
  venues = [],
  events = [],
  startHour = 0,
  endHour = 24,
  intervalMinutes = 15,
  venueWidth = 200,
  slotHeight = 60,
  timeColumnWidth = 100,
}) {
  // Measure actual cell height
  const cellRef = useRef(null);
  const [actualCellHeight, setActualCellHeight] = useState(slotHeight);

  useEffect(() => {
    if (cellRef.current) {
      const height = cellRef.current.offsetHeight;
      if (height > 0) {
        setActualCellHeight(height);
      }
    }
  }, [slotHeight]);

  // Calculate time slot positions
  const timeSlots = useMemo(
    () => generateTimeSlots(startHour, endHour, intervalMinutes),
    [startHour, endHour, intervalMinutes]
  );

  // Calculate total table width
  const totalTableWidth = useMemo(() => {
    return timeColumnWidth + venues.length * venueWidth;
  }, [timeColumnWidth, venues.length, venueWidth]);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "auto",
        border: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
        position: "relative",
        maxHeight: "100vh",
      }}
    >
      <Table
        sx={{
          width: `${totalTableWidth}px`,
          minWidth: `${totalTableWidth}px`,
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
            <TableRow
              key={rowIndex}
              sx={{
                height: `${slotHeight}px`,
                maxHeight: `${slotHeight}px`,
              }}
            >
              <TimeSlotCell
                time={time}
                timeColumnWidth={timeColumnWidth}
                slotHeight={slotHeight}
              />
              {venues.map((venue) => (
                <VenueCell
                  key={venue.id}
                  venue={venue}
                  venues={venues}
                  events={events}
                  slotTime={time}
                  rowIndex={rowIndex}
                  venueWidth={venueWidth}
                  slotHeight={slotHeight}
                  startHour={startHour}
                  intervalMinutes={intervalMinutes}
                  actualCellHeight={actualCellHeight}
                  cellRef={
                    rowIndex === 0 && venue.id === venues[0]?.id
                      ? cellRef
                      : null
                  }
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
