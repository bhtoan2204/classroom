// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImgTop = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/jungle.jpg' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Chào bạn tới với trang quản lý lớp học
        </Typography>
        <Typography variant='body2'>
          Bạn không thể chỉnh sửa chi tiết lớp học. Bạn có thể bật hoặc tắt hoạt động của lớp.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardImgTop
