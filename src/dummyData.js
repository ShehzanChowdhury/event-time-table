// Dummy data for venues and events
export const venues = [
  { id: 1, name: "Venue 1" },
  { id: 2, name: "Venue 2" },
  { id: 3, name: "Venue 3" },
  { id: 4, name: "Venue 4" },
];

// Events format: { id, venueIds (array), name, startTime, endTime, date }
// Times are in format "HH:MM" (24-hour format)
// venueIds can be a single venue ID or an array for events spanning multiple venues
export const events = [
  {
    id: 1,
    venueIds: [1], // Single venue event
    name: "Event 1",
    startTime: "09:00",
    endTime: "10:15",
    date: new Date().toISOString().split("T")[0], // Today's date
  },
  {
    id: 2,
    venueIds: [1, 2], // Multi-venue event spanning Venue 1 and 2
    name: "Meeting",
    startTime: "10:00",
    endTime: "13:30",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    venueIds: [2], // Single venue event
    name: "Event 3",
    startTime: "09:15",
    endTime: "10:00",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 4,
    venueIds: [3], // Single venue event
    name: "Event 4",
    startTime: "14:30",
    endTime: "15:45",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 5,
    venueIds: [2], // Single venue event
    name: "Event 5",
    startTime: "16:00",
    endTime: "17:30",
    date: new Date().toISOString().split("T")[0],
  },
];
