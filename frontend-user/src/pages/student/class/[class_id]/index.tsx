import { Backdrop, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useState } from "react";
import ClassSupportedFeature from "src/views/student/class/ClassSupportedFeature";
import ClassTasks from "src/views/student/class/ClassTasks";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { DELETE_leaveClass } from "src/api/student/class/leave_class/api";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { GET_getClassDetail } from "src/api/student/class/get_class_detail/api";


const classroomImages: any =
  [
    "https://img.freepik.com/free-photo/copy-space-surrounded-by-office-supplies_23-2148475345.jpg?w=1060&t=st=1703740272~exp=1703740872~hmac=648b46c0f7db09ab7d86a1495450db9abbad537f5a2c8612870b81bd36de0781",
    "https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149464866.jpg?w=1060&t=st=1703740313~exp=1703740913~hmac=dc4752bfefc66421f58e14e046ecbac39bdd9e88e1ae9b4aa4795ec96e935bd2",
    "https://img.freepik.com/free-vector/hand-drawn-colorful-science-education-wallpaper_23-2148489183.jpg?w=1060&t=st=1703740330~exp=1703740930~hmac=b315b1f005caf61155643b1d5d4ba9b80d96a5990fa69c9b1d227eeeab27cf4b",
    "https://img.freepik.com/free-vector/empty-school-class-background-video-conferencing_23-2148686345.jpg?w=1060&t=st=1703740387~exp=1703740987~hmac=eba14577638167df62801986654da0139e71ad5efa9033f2d30479a12bd8b6dc",
    "https://img.freepik.com/free-vector/interior-classroom_1308-26552.jpg?w=900&t=st=1703740419~exp=1703741019~hmac=4429dca33aab7a65a0e8cee9ff6d46859f359a329a51dd0c8f8abbfc3405b68a",
    "https://img.freepik.com/free-vector/teaching-concept-illustration_114360-2666.jpg?w=740&t=st=1703740458~exp=1703741058~hmac=87a169eb5dfdad3850a9e9e43db31a22dd297f4381e9b6ac9a97bc9a25a65c5b",
  ]


const StudentRoute = () => {

  const router = useRouter()
  const class_id = router.query.class_id;

  const [imageSrc, setImageSrc] = useState<any>("")
  const [moreMenuOpen, setMoreMenuOpen] = useState<any>(false)
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [backdropOpen, setBackdropOpen] = useState<any>(false)
  const [backdropContent, setBackdropContent] = useState<any>(<></>)
  const [classDetail, setClassDetail] = useState<any>({})

  useEffect(() =>
  {
      async function fetchClassDetail() 
      {
        if(class_id === undefined)
        {
          return
        }

        const {status, data} = await GET_getClassDetail(class_id);
        if(status == 200)
        {
          setClassDetail(data)
        }
        else
        {
          setClassDetail({})
        }
      }

      fetchClassDetail()

  }, [class_id])
 
  useEffect(() => {
    setImageSrc(getRandomImage())
  }, [])

  function getRandomImage() {
    const randomNum = Math.round(Math.random() * 100) + classroomImages.length;

    return classroomImages[randomNum % classroomImages.length]
  }

  function handleMoreVertButtonClose(event: any)
  {
    event.preventDefault()
    setAnchorEl(null)
    setMoreMenuOpen(false)
  }

  function handleMoreVertButtonClick(event: any)
  {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
    setMoreMenuOpen(true)
  }


  function handleMenuItemClick(event: MouseEvent, callback: any)
  {
    event.preventDefault()
    callback()
  }

  function handleBackDropClose()
  {
    setBackdropOpen(false)
  }

  async function handleLeaveTheClass(event: MouseEvent) 
  {
    event.preventDefault()
    const waitingDisplay = 
    <>
      <CardContent>
        <CircularProgress />
      </CardContent>
    </>

    setBackdropContent(waitingDisplay)

    const response = await DELETE_leaveClass(class_id);
    if(response.status == 200)
    {
      const successDisplay = 
      <>
        <CardContent>
          <Typography color={"green"}>
            <CheckCircleOutlineIcon/> Leaved the class successfully!
          </Typography>
        </CardContent>
        <CardActions>
          <Button href="/student/class">
            Ok
          </Button>
        </CardActions>
      </>

      setBackdropContent(successDisplay)
    }
    else
    {
      const failedDisplay = 
      <>
        <CardContent>
          <Typography color={"red"}>
            <HighlightOffIcon/> Leaved the class failed!
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleBackDropClose}>
            Ok
          </Button>
        </CardActions>
      </>

      setBackdropContent(failedDisplay)
    }
  }



  //Callbacks

  const menuItemClick_leaveTheClass: any = () =>
  {

    setBackdropOpen(true)
    setAnchorEl(null)
    setMoreMenuOpen(false)

    const warningDisplay = 
      <>
      <CardContent>
        <Typography color={"orange"}>
            <WarningAmberIcon/> Warning! This action can't be undone. Do you want to leave the class?
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleBackDropClose}>
            <Typography>
              No
            </Typography>
        </Button>
        <Button onClick={handleLeaveTheClass}>
            <Typography>
              Yes
            </Typography>
        </Button>
      </CardActions>
      </>

    setBackdropContent(warningDisplay)
  }

  const isActiveState = 
  <>
    <Tooltip
      title={classDetail.is_active !== undefined ? (classDetail.is_active == true ? "Active" : "Unactive") : "Loading..."}>
      {classDetail.is_active !== undefined ? (classDetail.is_active == true ? <CheckCircleOutlineIcon sx={{color:"green"}}/> : <HighlightOffIcon sx={{color:"red"}}/>): <CircularProgress size={"small"}/>}
    </Tooltip>
  </>
  

  return (
      <>
        <div>
          <Card>
            <CardMedia
              component="img"
              alt="class card"
              height={"230"}
              width={"100%"}
              image={imageSrc}
            />
            <CardContent >
              <Stack direction={"row"} sx={{width: "100%"}}>
                <Stack sx={{width: "100%"}}>
                  <Stack direction={"row"}>
                    <Typography component={"div"} variant="h5" paddingLeft={2} paddingY={4} marginRight={3}>
                      {classDetail.className !== undefined ? classDetail.className : "Class name"}
                    </Typography>
                    <Typography component={"div"} paddingY={5}>
                      {isActiveState}
                    </Typography>
                  </Stack>
                  <Typography component={"div"} paddingLeft={2}>
                    {class_id}
                  </Typography>
                </Stack>
                <Button onClick={handleMoreVertButtonClick}>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Button>
                <Menu
                  open={moreMenuOpen}
                  anchorEl={anchorEl}
                  onClose={handleMoreVertButtonClose}
                >
                  <MenuItem onClick={(e) => {handleMenuItemClick(e, menuItemClick_leaveTheClass)}}><Stack direction={"row"}><LogoutIcon/><Typography color={"red"} marginLeft={3}>Leave the class</Typography></Stack></MenuItem>
                </Menu>
              </Stack>
            </CardContent>
          </Card>
          <Stack direction={"row"} spacing={20} width={"100%"} marginTop={25}>
            <ClassSupportedFeature ClassId={class_id} />
            <ClassTasks />
          </Stack>
        </div>
        <Backdrop
          open={backdropOpen}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Card>
            {backdropContent}
          </Card>
        </Backdrop>
      </>
  )
}

export default StudentRoute;