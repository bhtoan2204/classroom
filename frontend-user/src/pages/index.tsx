// ** MUI Imports
// gridTemplateColumns: 'repeat(4, 1fr)',
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
//import OnlineUsers from 'src/views/dashboard/OnlineUsers'
import Pic from 'src/views/dashboard/Pic'
import DateCalendarServerRequest from 'src/views/dashboard/Calendar'


const Dashboard = () => {
  return (
    <Box sx={{
      display: 'grid',
      bgcolor: 'neutral-200',
      gap: 1,
      gridTemplateRows: 'auto',
      gridTemplateAreas: `"header header header header"
    "main main . sidebar"
    "footer footer footer footer"`,
    }}>
    <ApexChartWrapper>
        <Grid item xs={12} md={4}>
          <Pic />
        </Grid>
        <Grid container spacing ={0.5}>
          <Grid item xs={6} md={5}>
            <DateCalendarServerRequest />
          </Grid>
          {/* <Grid item xs={6} md={5}>
            <OnlineUsers />
          </Grid> */}
        </Grid>
    </ApexChartWrapper>
    </Box>
  )
}

export default Dashboard
