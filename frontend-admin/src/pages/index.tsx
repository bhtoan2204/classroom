import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import TableColapsiblePaginate from 'src/views/tables/TableColapsiblePaginate'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        </Grid>
        <Grid item xs={12}>
          <TableColapsiblePaginate />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
