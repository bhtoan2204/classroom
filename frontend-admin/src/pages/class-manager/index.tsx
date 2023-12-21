import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ClassManagerTable from 'src/views/tables/TableClass'
import CardImgTop from 'src/views/cards/CardImgTop'

const ClassManager = () => {
    return (
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <CardImgTop />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                </Grid>
                <Grid item xs={12}>
                    <ClassManagerTable />
                </Grid>
            </Grid>
        </ApexChartWrapper>
    )
}

export default ClassManager
