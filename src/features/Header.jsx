import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { getDaysOfWeek, formatDay } from "@utils";

export default function Header() {
  const [selectedTab, setSelectedTab] = useState(0);

  const days = getDaysOfWeek();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={selectedTab}
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
                  index === selectedTab ? "#e3f2fd" : "transparent",
                borderBottom:
                  index === selectedTab ? "none" : "1px solid #e0e0e0",
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
