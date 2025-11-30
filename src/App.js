import React from "react";
import Header from "./features/Header";
import EventTable from "./@components/common/EventTable";
import { venues } from "./dummyData";

function App() {
  return (
    <div className="App">
      <Header />
      <EventTable
        venues={venues}
        startHour={0}
        endHour={24}
        intervalMinutes={15}
        venueWidth={200}
        slotHeight={60}
      />
    </div>
  );
}

export default App;
