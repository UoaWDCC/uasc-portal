import { Grid, Typography, Divider, Paper } from "@mui/material"
import RequestBlock from "./RequestBlock"
import { useState, useEffect } from "react"

const AdminDashboardRequest = () => {
  const gridItemStyle = {
    requestBackground: {
      borderRadius: 15, // Change the value as needed
      backgroundColor: "gray", // Change the background color as needed
      padding: "20px", // Add padding as needed
      boxShadow: "none",
    },
  }

  const [requests, setRequests] = useState([])

  useEffect(() => {
    // eventually, we make this actually ask for the requests from firebase
    // for now, simulate waiting 1 second and then return some dummy data
    setTimeout(() => {
      setRequests([
        {
          user_id: "whatsgood",
          booking_id: "8mYj7rWOMH6hGy4FzMed",
          query: "I'd like to cancel my booking.",
          query_type: "cancellation",
          status: "unresolved",
        },
        {
          user_id: "deez",
          booking_id: "8mYj7rWOMH6hGy4FzMed",
          query: "I'd like to cancel my booking.",
          query_type: "cancellation",
          status: "unresolved",
        },
        {
          user_id: "hello",
          booking_id: "8mYj7rWOMH6hGy4FzMed",
          query: "I'd like to cancel my booking.",
          query_type: "cancellation",
          status: "unresolved",
        },
        {
          user_id: "bowling",
          booking_id: "8mYj7rWOMH6hGy4FzMed",
          query: "I'd like to cancel my booking.",
          query_type: "cancellation",
          status: "unresolved",
        },
      ])
    }, 1000)
  }, [])

  // now use requests to display the data

  return (
    <div>
      <Grid container rowSpacing={2} paddingTop="20px" sx={{ width: "100%" }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="left">
            REQUESTS
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="right">
            MANAGE
          </Typography>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={0} style={gridItemStyle.requestBackground}>
            <Grid
              sx={{
                overflowY: "scroll",
                height: "600px",
                maxHeight: "600px",
              }}
            >
              {requests.map((request, index) => (
                <RequestBlock
                  key={request.user_id}
                  requestData={request}
                  counter={index}
                />
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default AdminDashboardRequest
