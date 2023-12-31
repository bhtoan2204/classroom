// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DotsVertical from 'mdi-material-ui/DotsVertical'

interface DataType {
  logo: string
  title: string
  subtitle: string
  logoWidth: number
  logoHeight: number
}

const onlUser = [
  {
    logoWidth: 38,
    logoHeight: 38,
    subtitle: 'Student',
    title: 'Hao Toan',
    logo: '/images/logos/reading-book.png'
  },
  {
    logoWidth: 38,
    logoHeight: 38,
    title: 'Anh Le',
    subtitle: 'Student',
    logo: '/images/logos/reading-book.png'
  },
  {
    logoWidth: 38,
    logoHeight: 38,
    title: 'Phuong Le',
    subtitle: 'Teacher',
    logo: '/images/logos/teacher.png'
  },
  {
    logoWidth: 38,
    logoHeight: 38,
    title: 'Student1',
    subtitle: 'Student',
    logo: '/images/logos/reading-book.png'
  },
]

const OnlineUsers = () => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: 5, marginBlockStart: 5, width:200}}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Online User'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
          action={
            <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
              <DotsVertical />
            </IconButton>
          }
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(3)} !important`}}>
          {onlUser.map((item: DataType, index: number) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== onlUser.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                    <Typography variant='caption'>{item.subtitle}</Typography>
                  </Box>
                </Box>

              </Box>

            )
          })}
        </CardContent>
        <Box sx={{ marginLeft: 10, marginBottom: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Other User(40)</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default OnlineUsers
