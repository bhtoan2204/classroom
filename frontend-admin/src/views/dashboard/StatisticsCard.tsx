// ** React Imports
import { ReactElement, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { fetchStatistics } from 'src/api/statistics'
import { getCookieCustom } from '../../utils/cookies'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const renderStats = (salesData: DataType[]) => {
  return salesData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  const [salesData, setSalesData] = useState<DataType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getStatistics = () => {
    const fetchData = (async () => {
      const data = await fetchStatistics(getCookieCustom('accessToken') as string);
      if (data.status == 200) {
        const newData: DataType[] = [
          {
            stats: data.data.totalTeacher,
            title: 'Total Teachers',
            color: 'primary',
            icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: data.data.totalStudent,
            title: 'Total Students',
            color: 'success',
            icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: data.data.totalClass,
            color: 'warning',
            title: 'Total Classes',
            icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
          }
        ]
        setSalesData(newData)
      }
    })
    fetchData()
  }
  useEffect(() => {
    getStatistics()
    setIsLoading(false)
  }, [isLoading])

  return (
    <Card>
      <CardHeader
        title='Statistics'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Box
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt="The house from the offer."
            src="/images/wallpaper/2.jpg"
          />
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(salesData)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
