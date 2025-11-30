import React from "react";
import { TableCell } from "@mui/material";
import EventBox from "./EventBox";
import {
  getEventsForSlotAndVenue,
  prepareEventForRendering,
} from "../../@utils";

/**
 * VenueCell - Displays venue cell with events
 * @param {Object} venue - Venue object
 * @param {Array} venues - Array of all venues
 * @param {Array} events - Array of events
 * @param {string} slotTime - Time string for the slot
 * @param {number} rowIndex - Row index for alternating background
 * @param {number} venueWidth - Width of venue column
 * @param {number} slotHeight - Height of time slot
 * @param {number} startHour - Starting hour
 * @param {number} intervalMinutes - Interval between slots
 * @param {number} actualCellHeight - Actual measured cell height
 * @param {React.Ref} cellRef - Ref for measuring cell height (only for first cell)
 */
export default function VenueCell({
  venue,
  venues,
  events,
  slotTime,
  rowIndex,
  venueWidth,
  slotHeight,
  startHour,
  intervalMinutes,
  actualCellHeight,
  cellRef,
}) {
  const slotEvents = getEventsForSlotAndVenue(events, slotTime, venue, venues);

  return (
    <TableCell
      ref={cellRef}
      sx={{
        width: `${venueWidth}px`,
        maxWidth: `${venueWidth}px`,
        height: `${slotHeight}px`,
        position: "relative",
        padding: 0,
        boxSizing: "border-box",
        borderBottom: "0",
        backgroundColor: "#cccccc",
        overflow: "visible",
      }}
    >
      {slotEvents.map((event) => {
        const eventData = prepareEventForRendering(
          event,
          venue,
          venues,
          startHour,
          intervalMinutes,
          actualCellHeight,
          venueWidth
        );

        return (
          <EventBox
            key={`${event.id}-${eventData.venueGroup.join("-")}`}
            event={eventData.event}
            top={eventData.top}
            height={eventData.height}
            left={eventData.left}
            width={eventData.width}
            fillCell={eventData.fillCell}
            isSingleSlot={eventData.isSingleSlot}
            color={eventData.color}
            isMultiVenue={eventData.isMultiVenue}
          />
        );
      })}
    </TableCell>
  );
}
