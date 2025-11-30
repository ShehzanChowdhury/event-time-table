import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * TimeSlotColumn - Displays time slots in 15-minute intervals
 * @param {number} startHour - Starting hour (default: 0 for midnight)
 * @param {number} endHour - Ending hour (default: 24 for midnight next day)
 * @param {number} intervalMinutes - Interval in minutes (default: 15)
 * @param {number} slotHeight - Height of each time slot in pixels
 * @param {number} width - Width of the time column in pixels
 */
export default function TimeSlotColumn({
  startHour = 0,
  endHour = 24,
  intervalMinutes = 15,
  slotHeight = 60,
  width = 100,
}) {
  const generateTimeSlots = () => {
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
  };

  const timeSlots = generateTimeSlots();

  return (
    <Box
      sx={{
        position: "sticky",
        left: 0,
        zIndex: 5,
        backgroundColor: "#ffffff",
        borderRight: "2px solid #e0e0e0",
        width: `${width}px`,
        minWidth: `${width}px`,
      }}
    >
      {timeSlots.map((time, index) => (
        <Box
          key={index}
          sx={{
            height: `${slotHeight}px`,
            minHeight: `${slotHeight}px`,
            padding: "8px 12px",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fafafa",
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
        </Box>
      ))}
    </Box>
  );
}
