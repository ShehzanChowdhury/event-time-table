/*
 * - Global utility function goes here
 */

// Generate 7 days starting from today
export const getDaysOfWeek = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }

  return days;
};

// Format date for display
export const formatDay = (date) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[date.getDay()];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;
  return { dayName, dateString };
};

/**
 * Get date string in YYYY-MM-DD format
 * @param {Date} date - Date object
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const getDateString = (date) => {
  return date.toISOString().split("T")[0];
};

/**
 * Add days to a date
 * @param {Date} date - Date object
 * @param {number} days - Number of days to add
 * @returns {Date} New Date object
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
};

/**
 * Convert time string (HH:MM) to minutes since midnight
 * @param {string} timeString - Time in format "HH:MM"
 * @returns {number} Minutes since midnight
 */
export const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Generate time slots array based on start hour, end hour, and interval
 * @param {number} startHour - Starting hour (0-23)
 * @param {number} endHour - Ending hour (0-24)
 * @param {number} intervalMinutes - Interval between time slots in minutes
 * @returns {Array<string>} Array of time strings in "HH:MM" format
 */
export const generateTimeSlots = (startHour, endHour, intervalMinutes) => {
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

/**
 * Calculate event positioning information
 * @param {Object} event - Event object with startTime, endTime
 * @param {number} startHour - Starting hour for time slots
 * @param {number} intervalMinutes - Interval between time slots
 * @param {number} slotHeight - Height of each time slot in pixels
 * @returns {Object} { startSlotIndex, numSlots, height }
 */
export const calculateEventPosition = (
  event,
  startHour,
  intervalMinutes,
  slotHeight
) => {
  const eventStartMinutes = timeToMinutes(event.startTime);
  const eventEndMinutes = timeToMinutes(event.endTime);
  const startMinutes = startHour * 60;

  // Calculate which slot the event starts in
  const startSlotIndex = Math.floor(
    (eventStartMinutes - startMinutes) / intervalMinutes
  );

  // Calculate which slot the event ends in (exclusive - event ends at the start of this slot)
  const endSlotIndex = Math.floor(
    (eventEndMinutes - startMinutes) / intervalMinutes
  );

  // Calculate how many slots the event spans
  // The event occupies slots from startSlotIndex (inclusive) to endSlotIndex (exclusive)
  const numSlots = endSlotIndex - startSlotIndex;

  // Calculate the height in pixels
  const height = numSlots * slotHeight;

  return {
    startSlotIndex,
    numSlots,
    height,
  };
};

/**
 * Get a color for an event based on its ID
 * Uses a predefined color palette to ensure consistent colors
 * @param {number} eventId - Event ID
 * @returns {string} Hex color code
 */
export const getEventColor = (eventId) => {
  // A palette of distinct, vibrant colors with good contrast
  const colors = [
    "#1976d2", // Blue
    "#388e3c", // Green
    "#f57c00", // Orange
    "#7b1fa2", // Purple
    "#c2185b", // Pink
    "#0288d1", // Light Blue
    "#689f38", // Light Green
    "#fbc02d", // Yellow
    "#5d4037", // Brown
    "#455a64", // Blue Grey
    "#d32f2f", // Red
    "#00796b", // Teal
    "#e64a19", // Deep Orange
    "#512da8", // Deep Purple
    "#303f9f", // Indigo
  ];

  // Use modulo to cycle through colors based on event ID
  return colors[eventId % colors.length];
};

/**
 * Group adjacent venue IDs together
 * @param {Array} venueIds - Array of venue IDs
 * @param {Array} venues - Array of all venues (ordered)
 * @returns {Array} Array of groups, where each group is an array of adjacent venue IDs
 */
export const groupAdjacentVenues = (venueIds, venues) => {
  if (!venueIds || venueIds.length === 0) return [];
  if (venueIds.length === 1) return [[venueIds[0]]];

  // Create a map of venue ID to index in the venues array
  const venueIndexMap = new Map();
  venues.forEach((venue, index) => {
    venueIndexMap.set(venue.id, index);
  });

  // Sort venue IDs by their position in the venues array
  const sortedVenueIds = [...venueIds].sort(
    (a, b) => venueIndexMap.get(a) - venueIndexMap.get(b)
  );

  // Group adjacent venues
  const groups = [];
  let currentGroup = [sortedVenueIds[0]];

  for (let i = 1; i < sortedVenueIds.length; i++) {
    const prevIndex = venueIndexMap.get(sortedVenueIds[i - 1]);
    const currentIndex = venueIndexMap.get(sortedVenueIds[i]);

    // Check if venues are adjacent (consecutive in the venues array)
    if (currentIndex === prevIndex + 1) {
      currentGroup.push(sortedVenueIds[i]);
    } else {
      // Not adjacent, start a new group
      groups.push(currentGroup);
      currentGroup = [sortedVenueIds[i]];
    }
  }

  // Add the last group
  groups.push(currentGroup);

  return groups;
};

/**
 * Calculate the left position and width for a group of venues
 * @param {Array} venueGroup - Array of venue IDs in the group
 * @param {Array} venues - Array of all venues (ordered)
 * @param {number} venueWidth - Width of each venue column
 * @returns {Object} { left, width } in pixels
 */
export const calculateVenueGroupPosition = (venueGroup, venues, venueWidth) => {
  // Find the first venue in the group
  const firstVenueIndex = venues.findIndex((v) => v.id === venueGroup[0]);
  const left = firstVenueIndex * venueWidth;
  const width = venueGroup.length * venueWidth;

  return { left, width };
};

/**
 * Get events that should be rendered in a specific time slot and venue
 * Only returns events that start at this time slot and should be rendered in this venue
 * @param {Array} events - Array of all events
 * @param {string} slotTime - Time string for the slot (HH:MM)
 * @param {Object} venue - Venue object
 * @param {Array} venues - Array of all venues (ordered)
 * @returns {Array} Array of events to render
 */
export const getEventsForSlotAndVenue = (events, slotTime, venue, venues) => {
  return events.filter((event) => {
    // Check if event starts at this time slot
    const eventStartMinutes = timeToMinutes(event.startTime);
    const slotMinutes = timeToMinutes(slotTime);
    if (eventStartMinutes !== slotMinutes) return false;

    // Check if this venue is part of the event
    const venueIds = Array.isArray(event.venueIds)
      ? event.venueIds
      : [event.venueIds];
    if (!venueIds.includes(venue.id)) return false;

    // Only render in the first venue of each adjacent group
    const venueGroups = groupAdjacentVenues(venueIds, venues);
    const firstVenueInGroup = venueGroups.find((group) =>
      group.includes(venue.id)
    )?.[0];
    return firstVenueInGroup === venue.id;
  });
};

/**
 * Prepare event data for rendering in EventBox
 * Calculates all necessary dimensions and properties
 * @param {Object} event - Event object
 * @param {Object} venue - Venue object where event is being rendered
 * @param {Array} venues - Array of all venues (ordered)
 * @param {number} startHour - Starting hour for time slots
 * @param {number} intervalMinutes - Interval between time slots
 * @param {number} actualCellHeight - Actual height of each cell in pixels
 * @param {number} venueWidth - Width of each venue column
 * @returns {Object} Event data ready for EventBox rendering
 */
export const prepareEventForRendering = (
  event,
  venue,
  venues,
  startHour,
  intervalMinutes,
  actualCellHeight,
  venueWidth
) => {
  // Calculate event position and height
  const { height: eventHeight, numSlots } = calculateEventPosition(
    event,
    startHour,
    intervalMinutes,
    actualCellHeight
  );

  // Get venue IDs for this event
  const venueIds = Array.isArray(event.venueIds)
    ? event.venueIds
    : [event.venueIds];

  // Group adjacent venues
  const venueGroups = groupAdjacentVenues(venueIds, venues);

  // Find the group that contains this venue
  const venueGroup = venueGroups.find((group) => group.includes(venue.id));

  // Calculate position and width for this venue group
  const { width } = calculateVenueGroupPosition(venueGroup, venues, venueWidth);

  const isMultiVenue = venueGroup.length > 1;

  return {
    event,
    top: 0,
    height: eventHeight,
    left: 0,
    width,
    fillCell: true,
    isSingleSlot: numSlots === 1,
    color: getEventColor(event.id),
    isMultiVenue,
    venueGroup,
  };
};
