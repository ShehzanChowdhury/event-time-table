import React, { useState, useEffect } from "react";
import Header from "./features/Header";
import EventTable from "./features/Event/EventTable";
import Loading from "./@components/ui/common/Loading";
import { venues, fetchEventsByDate } from "./dummyData";
import { getDateString } from "./@utils";

function App() {
  const [selectedDate, setSelectedDate] = useState(getDateString(new Date()));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch events when date changes
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        // Simulate API call
        const fetchedEvents = await fetchEventsByDate(selectedDate);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [selectedDate]);

  // Handler for date change (can be called from Header or date picker)
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
      <Header onDateChange={handleDateChange} selectedDate={selectedDate} />
      {loading ? (
        <Loading />
      ) : (
        <EventTable
          venues={venues}
          events={events}
          startHour={0}
          endHour={24}
          intervalMinutes={15}
          venueWidth={320}
          slotHeight={80}
        />
      )}
    </div>
  );
}

export default App;
