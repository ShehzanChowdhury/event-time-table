import React, { useEffect, useMemo } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { getDaysOfWeek, formatDay } from "@utils";

export default function Header({ onDateChange, selectedDate }) {
  const days = useMemo(() => getDaysOfWeek(), []);

  // Find the tab index that matches the selected date
  const selectedTabIndex = useMemo(() => {
    if (!selectedDate) return 0;
    const index = days.findIndex((day) => {
      const { dateString } = formatDay(day);
      return dateString === selectedDate;
    });
    return index >= 0 ? index : 0;
  }, [selectedDate, days]);

  const handleChange = (event, newValue) => {
    const selectedDate = formatDay(days[newValue]).dateString;
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  // Initialize with first day's date if no selectedDate is provided
  useEffect(() => {
    if (!selectedDate && onDateChange && days.length > 0) {
      const firstDate = formatDay(days[0]).dateString;
      onDateChange(firstDate);
    }
  }, [onDateChange, days, selectedDate]);

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: 1,
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Tabs
        value={selectedTabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {days.map((date, index) => {
          const { dayName, dateString } = formatDay(date);
          return (
            <Tab
              key={index}
              label={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                    padding: " 10px 20px",
                  }}
                >
                  <span>{dayName}</span>
                  <span>Date: {dateString}</span>
                </Box>
              }
              sx={{
                textTransform: "none",
                minWidth: { xs: 80, sm: 100 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                border: "1px solid #e0e0e0",
                backgroundColor:
                  index === selectedTabIndex ? "#e3f2fd" : "transparent",
                borderBottom:
                  index === selectedTabIndex ? "none" : "1px solid #e0e0e0",
                "&.Mui-selected": {
                  borderBottom: "none",
                },
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
