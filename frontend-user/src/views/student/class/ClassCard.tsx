import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, Menu, MenuItem } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const classroomImages: any =
  [
    "https://img.freepik.com/free-photo/copy-space-surrounded-by-office-supplies_23-2148475345.jpg?w=1060&t=st=1703740272~exp=1703740872~hmac=648b46c0f7db09ab7d86a1495450db9abbad537f5a2c8612870b81bd36de0781",
    "https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149464866.jpg?w=1060&t=st=1703740313~exp=1703740913~hmac=dc4752bfefc66421f58e14e046ecbac39bdd9e88e1ae9b4aa4795ec96e935bd2",
    "https://img.freepik.com/free-vector/hand-drawn-colorful-science-education-wallpaper_23-2148489183.jpg?w=1060&t=st=1703740330~exp=1703740930~hmac=b315b1f005caf61155643b1d5d4ba9b80d96a5990fa69c9b1d227eeeab27cf4b",
    "https://img.freepik.com/free-vector/empty-school-class-background-video-conferencing_23-2148686345.jpg?w=1060&t=st=1703740387~exp=1703740987~hmac=eba14577638167df62801986654da0139e71ad5efa9033f2d30479a12bd8b6dc",
    "https://img.freepik.com/free-vector/interior-classroom_1308-26552.jpg?w=900&t=st=1703740419~exp=1703741019~hmac=4429dca33aab7a65a0e8cee9ff6d46859f359a329a51dd0c8f8abbfc3405b68a",
    "https://img.freepik.com/free-vector/teaching-concept-illustration_114360-2666.jpg?w=740&t=st=1703740458~exp=1703741058~hmac=87a169eb5dfdad3850a9e9e43db31a22dd297f4381e9b6ac9a97bc9a25a65c5b",
  ]



function ClassCard({ ClassInfo }: any) {
  const [menuOpen, setMenuOpen] = useState<any>(false)
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [imageSrc, setImageSrc] = useState<any>("")

  useEffect(() => {
    setImageSrc(getRandomImage())
  }, [])

  function handleMoreVertButtonClick(event: React.MouseEvent) {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  function getRandomImage() {
    const randomNum = Math.round(Math.random() * 100) + classroomImages.length;

    return classroomImages[randomNum % classroomImages.length]
  }

  function handleMoreVertButtonClose(event: React.MouseEvent) {
    event.preventDefault()
    setAnchorEl(null)
    setMenuOpen(false)
  }

  return (
    <Link key={ClassInfo._id}
      prefetch={false}
      href={`/student/class/${ClassInfo._id}`}
      passHref={true}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="class card"
          height="120"
          width={"80"}
          image={imageSrc}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {ClassInfo === undefined ? <CircularProgress /> : ClassInfo.className}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ClassInfo === undefined ? <CircularProgress /> : ClassInfo.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ maxWidth: 340 }} style={{ display: 'flex', justifyContent: 'right' }} >
          <Button size="small" onClick={handleMoreVertButtonClick}><MoreVertOutlinedIcon style={{ color: 'black' }} /></Button>
          <Menu key={`menu-for-${ClassInfo._id}`}
            open={menuOpen}
            anchorEl={anchorEl}
            onClose={handleMoreVertButtonClose}
          >
            <MenuItem>Leave</MenuItem>
          </Menu>
        </CardActions>
      </Card>
    </Link>
  );
}

export default ClassCard