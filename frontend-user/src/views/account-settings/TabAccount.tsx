import { useState, ElementType, ChangeEvent, forwardRef, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

import Close from 'mdi-material-ui/Close'
import DatePicker from 'react-datepicker'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { getCookieCustom, setCookieCustom } from '../../utils/cookies'
import { fetchProfile } from 'src/api/user/getProfile'
import { fetchUpdateProfile } from 'src/api/user/updateProfile'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabAccount = () => {

  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success')

  const [imgSrc, setImgSrc] = useState<string>('')

  const [profile, setProfile] = useState({
    _id: '',
    email: '',
    fullname: '',
    role: '',
    avatar: null,
    birthday: new Date(),
    createdAt: '',
    updateAt: '',
    id: '',
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  const onChange = (event: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = event.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result as string)
      }
      setImage(files[0]);
      reader.readAsDataURL(files[0])
    }
  }

  const updateProfile = async () => {
    const formData = new FormData();
    if (image !== null) {
      formData.append('avatar', image);
    }

    if (image !== null || profile.fullname !== originalFullname || profile.birthday !== originalBirthday) {
      try {
        const accessToken = getCookieCustom('accessToken');
        if (image !== null) {
          await fetch(process.env.NEXT_PUBLIC_API_HOST + '/user/upload_avatar', {
            method: 'PATCH',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
            },
            body: formData
          });
        }

        const updateData = await fetchUpdateProfile(profile.fullname, profile.birthday, accessToken as string);

        if (updateData.status === 201) {
          setCookieCustom('fullName', profile.fullname, 1);
          setSeverity('success');
          setContent(updateData.data.message);
          setOpenAlert(true);
        } else {
          setSeverity('error');
          setContent(updateData.message);
          setOpenAlert(true);
        }
      } catch (error) {
        setSeverity('error');
        setContent('Failed to update profile');
        setOpenAlert(true);
      }
    } else {
      setSeverity('info');
      setContent('No changes detected');
      setOpenAlert(true);
    }
  };


  const [originalFullname, setOriginalFullname] = useState<string>('');
  const [originalBirthday, setOriginalBirthday] = useState<Date>(new Date());


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data) {
          data.birthday = new Date(data.birthday);
          setProfile(data);
          setImgSrc(data.avatar);
          setOriginalFullname(data.fullname);
          setOriginalBirthday(data.birthday);
        }
      } catch (error) {
        setSeverity('error');
        setContent('Failed to fetch profile data');
        setOpenAlert(true);
        setLoading(false);
      }
    };

    if (loading) {
      fetchProfile();
    }
  }, [loading]);

  const getProfile = async () => {
    const response = await fetchProfile(getCookieCustom('accessToken') as string);
    if (response.status === 200) {
      return response.data;
    }
    else {
      return null;
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fullname"
              value={profile.fullname}
              onChange={(text) => setProfile({ ...profile, fullname: text.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={profile.birthday}
                showYearDropdown
                showMonthDropdown
                id="account-settings-date"
                customInput={<CustomInput />}
                onChange={(date) => setProfile({ ...profile, birthday: date as Date })}
              />
            </DatePickerWrapper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={profile.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="role"
              label="Role"
              value={profile.role}
            />
          </Grid>
          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity={severity}
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>{content}</AlertTitle>
              </Alert>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={updateProfile}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
