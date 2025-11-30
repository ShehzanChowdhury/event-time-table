import { getDateString, addDays } from "./@utils";

// Dummy data for venues
export const venues = [
  { id: 1, name: "Venue 1" },
  { id: 2, name: "Venue 2" },
  { id: 3, name: "Venue 3" },
  { id: 4, name: "Venue 4" },
  { id: 5, name: "Venue 5" },
  { id: 6, name: "Venue 6" },
];

// Simulated API response structure - Events grouped by date
export const eventsByDate = {
  // Today's events
  [getDateString(new Date())]: [
    {
      id: 1,
      venueIds: [1], // Single venue event
      name: "Event 1",
      startTime: "09:00",
      endTime: "10:00",
      date: getDateString(new Date()),
    },
    {
      id: 2,
      venueIds: [1, 2], // Multi-venue event spanning Venue 1 and 2
      name: "Team Meeting",
      startTime: "10:15",
      endTime: "13:30",
      date: getDateString(new Date()),
    },
    {
      id: 3,
      venueIds: [3], // Single venue event (moved from Venue 2 to avoid overlap)
      name: "Event 3",
      startTime: "09:15",
      endTime: "10:00",
      date: getDateString(new Date()),
    },
    {
      id: 4,
      venueIds: [4], // Single venue event (moved from Venue 3 to avoid overlap)
      name: "Event 4",
      startTime: "14:30",
      endTime: "15:45",
      date: getDateString(new Date()),
    },
    {
      id: 5,
      venueIds: [2], // Single venue event
      name: "Event 5",
      startTime: "14:00",
      endTime: "15:30",
      date: getDateString(new Date()),
    },
    {
      id: 6,
      venueIds: [5], // 15-minute event (moved from Venue 2 to avoid overlap)
      name: "Quick Meeting",
      startTime: "11:00",
      endTime: "11:15",
      date: getDateString(new Date()),
    },
  ],

  // Tomorrow's events
  [getDateString(addDays(new Date(), 1))]: [
    {
      id: 7,
      venueIds: [1, 2, 3], // Multi-venue event spanning 3 adjacent venues
      name: "Conference",
      startTime: "09:00",
      endTime: "12:00",
      date: getDateString(addDays(new Date(), 1)),
    },
    {
      id: 8,
      venueIds: [4], // Single venue event
      name: "Workshop",
      startTime: "14:00",
      endTime: "16:00",
      date: getDateString(addDays(new Date(), 1)),
    },
    {
      id: 9,
      venueIds: [4, 5], // Multi-location event (changed from Venue 1,3 to avoid overlap with Conference)
      name: "Multi-Location Event",
      startTime: "12:30",
      endTime: "13:45",
      date: getDateString(addDays(new Date(), 1)),
    },
  ],

  // Day after tomorrow's events
  [getDateString(addDays(new Date(), 2))]: [
    {
      id: 10,
      venueIds: [1], // Single venue event (changed from Venue 5 to avoid potential conflicts)
      name: "Training Session",
      startTime: "09:00",
      endTime: "17:00",
      date: getDateString(addDays(new Date(), 2)),
    },
    {
      id: 11,
      venueIds: [2, 3], // Adjacent venues
      name: "Collaboration Meeting",
      startTime: "10:30",
      endTime: "12:00",
      date: getDateString(addDays(new Date(), 2)),
    },
  ],
};

/**
 * Get events for a specific date
 * @param {string} dateString - Date in format "YYYY-MM-DD"
 * @returns {Array} Array of events for that date, or empty array if no events
 */
export const getEventsByDate = (dateString) => {
  return eventsByDate[dateString] || [];
};

/**
 * Simulated API function to fetch events for a date
 * @param {string} dateString - Date in format "YYYY-MM-DD"
 * @returns {Promise<Array>} Promise that resolves to array of events
 */
export const fetchEventsByDate = async (dateString) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Return events for the requested date
  return getEventsByDate(dateString);
};
