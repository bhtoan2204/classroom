import { useState, SyntheticEvent, Fragment, ReactNode, useEffect } from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

import BellOutline from 'mdi-material-ui/BellOutline'

import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { createConnection, getSocket } from 'src/api/socket'
import { fetchNotification } from 'src/api/notification'
import { getCookieCustom } from 'src/utils/cookies'
import { Badge, Snackbar } from '@mui/material'
import { fetchMarkRead } from 'src/api/notification/markRead'
import { GradingOutlined } from '@mui/icons-material'
import { BookMarkerOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'

const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}));

const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

interface NotificationDropdownProps {
  _id: string,
  sender_id: string,
  sender_avatar: string,
  title: string,
  content: string,
  is_read: boolean,
  type: string,
  url_id: string
}

const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const [notifications, setNotifications] = useState<NotificationDropdownProps[]>([]);
  const [unread, setUnread] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);

  const router = useRouter();

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  const handleNavigate = async (type: string, url_id: string, _id: string, is_read: boolean) => {
    const accessToken = getCookieCustom('accessToken') as string;
    if (!is_read) {
      await fetchMarkRead(_id, accessToken);
    }
    const role = getCookieCustom("role") as string;
    if (type === 'grade_review') {
      if (role === "teacher") {
        router.push(`/teacher/grade-review/${url_id}`)
      }
      else if (role === "student") {
        router.push(`/student/review/${url_id}`)
      }
    }
    else if (type === 'mark_final') {
      if (role === "teacher") {
        router.push(`/teacher/class-detail/${url_id}`)
      }
      else if (role === "student") {
        router.push(`/student/class/${url_id}`)
      }
    }
  }

  const fetchData = async () => {
    const accessToken = getCookieCustom('accessToken') as string;
    const data = await fetchNotification(accessToken);
    if (data.status === 200) {
      setNotifications(data.data.notifications.reverse());
      setUnread(data.data.unreadNotifications);
    }
  }

  useEffect(() => {
    let socket = getSocket();
    if (socket === null) {
      createConnection();
      socket = getSocket();
    }
    const handleNotification = (data: NotificationDropdownProps) => {
      setUnread((prevUnread) => prevUnread + 1);
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
      setShowNotification(true);
    };
    fetchData();

    if (socket) {
      socket.on('onNotification', handleNotification);

    }
  }, []);

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge badgeContent={unread} color="error">
          <BellOutline />
        </Badge>
      </IconButton>
      <Snackbar
        open={showNotification}
        autoHideDuration={5000}
        onClose={() => setShowNotification(false)}
        message="New Notification!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClick={handleDropdownOpen}
        onMouseEnter={() => setShowNotification(true)}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size='small'
              label={unread + ' unread'}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {
            notifications.map((notification) => (
              <MenuItem
                key={notification._id}
                onClick={() => handleNavigate(notification.type, notification.url_id, notification._id, notification.is_read)}
                sx={{
                  backgroundColor: notification.is_read ? 'f0f0f0' : 'inherit',
                  color: notification.is_read ? 'gray' : 'inherit',
                  position: 'relative',
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <div
                        style={{
                          width: '15px',
                          height: '15px',
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {notification.type === 'grade_review' ? (
                          <Avatar sx={{ width: '18px', height: '18px', backgroundColor: '#abf4ef' }}>
                            <GradingOutlined sx={{ width: '12px', height: '12px' }} />
                          </Avatar>
                        ) : (
                          <Avatar sx={{ width: '18px', height: '18px', backgroundColor: '#abf4ef' }}>
                            <BookMarkerOutline sx={{ width: '12px', height: '12px' }} />
                          </Avatar>
                        )}
                      </div>
                    }
                  >
                    <Avatar
                      alt='Flora'
                      src={notification.sender_avatar}
                      style={{ opacity: notification.is_read ? 0.5 : 1 }}
                    />
                  </Badge>

                  <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                    <MenuItemTitle style={{ fontSize: '1.0rem', color: notification.is_read ? 'gray' : 'inherit' }}>
                      {notification.title}
                    </MenuItemTitle>
                    <MenuItemSubtitle variant='body2' style={{ fontSize: '0.8rem', color: notification.is_read ? 'gray' : 'inherit' }}>
                      {notification.content}
                    </MenuItemSubtitle>
                  </Box>
                  {!notification.is_read && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#abf4ef',
                        marginRight: '10px',
                      }}
                    />
                  )}
                </Box>
              </MenuItem>
            ))
          }
        </ScrollWrapper >

        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
        </MenuItem>
      </Menu >
    </Fragment >
  )
}

export default NotificationDropdown
