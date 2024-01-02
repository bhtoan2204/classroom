import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImgTop = () => {
    return (
        <Card>
            <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/class-manage.jpg' />
            <CardContent>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                    Chào bạn tới với trang quản lý lớp học
                </Typography>
                <Typography variant='body2'>
                    Quản lý lớp vui vẻ nhá
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardImgTop
