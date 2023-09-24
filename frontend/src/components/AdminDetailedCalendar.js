import React, { useState } from "react"
import {
  Paper,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
} from "@mui/material"
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material"
import "../pages/Admin.css"

const AdminDetailedCalendar = ({ setSelectedUser, setCheckInDate, setCheckOutDate, setTotalDays }) => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const [weekOffset, setWeekOffset] = useState(0)

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - startDate.getDay() + weekOffset * 7)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  // Fake dataset for now - will be replaced with API call
  const bookings = {
    SUN: ["User A"],
    MON: [],
    TUE: ["User A", "User B"],
    WED: ["User A", "User C", "User D"],
    THU: [],
    FRI: ["User A", "User B", "User C", "User D"],
    SAT: ["User C", "User D"],
  }

  const handleUserClick = (user, index) => {
    setSelectedUser(user)

    var clickedDate = new Date(startDate.valueOf())
    clickedDate.setDate(clickedDate.getDate() + index)
    setCheckInDate(clickedDate.toLocaleDateString())

    var checkOutDate = new Date(clickedDate.valueOf())
    checkOutDate.setDate(checkOutDate.getDate() + 3)
    setCheckOutDate(checkOutDate.toLocaleDateString())

    setTotalDays(Math.ceil(checkOutDate.getTime() - clickedDate.getTime()) / (1000 * 3600 * 24))
  }

  return (
    <div style={{ width: "60%", backgroundColor: "transparent" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingTop: "20px" }}
      >
        <Typography
          variant="h3"
          align="left"
          sx={{ fontWeight: "900" }}
        >
          Bookings
        </Typography>
      </Stack>
      <Paper
        elevation={2}
        sx={{
          padding: "32px",
          borderRadius: "15px",
          background: "white",
          boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)",
          marginTop: "16px",
        }}
        className="calendar-container"
      >
        <div className="container-header">
          <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" paddingLeft="1rem" className="date-range">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </Typography>
          <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
            <ArrowForwardIos />
          </IconButton>
        </div>
        <Grid container spacing={1}>
          {daysOfWeek.map((day, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={12 / daysOfWeek.length}
              className="day-container"
              sx={{
                backgroundColor: "common.grey",
              }}
            >
              <Typography align="center" variant="h6">
                {day}
              </Typography>
              <div className="user-buttons-container">
                {bookings[day]?.length > 0 ? (
                  bookings[day].map((user, userIndex) => (
                    <Button
                      key={userIndex}
                      onClick={() => handleUserClick(user, index)}
                      className="user-button"
                      sx={{ color: "primary.quaternary" }}
                    >
                      {user}
                    </Button>
                  ))
                ) : (
                  <Typography variant="no-booking">No bookings</Typography>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  )
}

export default AdminDetailedCalendar
