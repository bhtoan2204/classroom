import { ChangeEvent, MouseEvent, ReactNode, forwardRef, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert';


import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import themeConfig from 'src/configs/themeConfig'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { fetchLogin } from 'src/api/auth/login'
import { getCookieCustom, setCookieCustom } from '../../../utils/cookies'
import { Facebook, Google } from 'mdi-material-ui'
import { fetchProfile } from 'src/api/user/getProfile'
import { sendOtpReset } from 'src/api/auth/sendOtpReset'
import { fetchResetpassword } from 'src/api/auth/forgotPassword'


interface State {
  email: string
  password: string
  showPassword: boolean
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Role {
  role: string
}

const LoginPage = () => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false
  })

  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleLogin = async () => {
    try {
      const data = await fetchLogin(values.email, values.password);
      if (data.status === 200) {
        setCookieCustom('accessToken', (data as { data: { accessToken: string } }).data.accessToken, 1);
        setCookieCustom('refreshToken', (data as { data: { refreshToken: string } }).data.refreshToken, 3);
        const response = await fetchProfile(getCookieCustom('accessToken') as string);
        const { role }: Role = response.data;
        setCookieCustom('role', role, 100);
        router.push('/dashboard')
      }
      else {
        setError((data as { errorData: { message: string } }).errorData.message)
      }
    } catch (error) {
      setError("Error occurs while login: " + error);
    }
  }

  const [isSendOTPModalOpen, setIsSendOTPModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [modalValues, setModalValues] = useState({
    email: '',
    otp: 0,
    newPassword: '',
    confirmPassword: '',
  });


  const openSendOTPModal = () => {
    setIsSendOTPModalOpen(true);
    setIsResetPasswordModalOpen(false);
  };

  const closeSendOTPModal = () => {
    setIsSendOTPModalOpen(false);
    setModalValues({
      ...modalValues, email: ''
    })
  }

  const closeResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
    setModalValues({
      ...modalValues, otp: 0, newPassword: '', confirmPassword: ''
    })
  }

  const handleModalChange = (prop: keyof typeof modalValues) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setModalValues({ ...modalValues, [prop]: event.target.value });
  };

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendOTP = async () => {
    try {

      const { data, status, errorData } = await sendOtpReset(modalValues.email);

      if (status === 201) {
        setSuccessMessage(data.message);
        setErrorMessage(null);
        setIsResetPasswordModalOpen(true);
        setIsSendOTPModalOpen(false);
        setOpen(true)

      } else {
        setErrorMessage(errorData?.message || "Unknown error occurred");
        setSuccessMessage(null);
        setIsResetPasswordModalOpen(false);
        setIsSendOTPModalOpen(true);
        setOpen(true)
      }
    } catch (error) {

      setErrorMessage("Error occurs while sending OTP: " + error);
      setSuccessMessage(null);
      setOpen(true)
    }
  };

  const handleResetpassword = async () => {
    try {
      const { data, error, status } = await fetchResetpassword(modalValues.email, modalValues.otp, modalValues.newPassword, modalValues.confirmPassword)
      if (error) {
        setErrorMessage(`Error: ${error}`);
        setOpen(true)
      }
      else {
        if (status === 201) {
          setSuccessMessage(data.message);
          setErrorMessage(null);
          setOpen(true)
        } else {
          setErrorMessage(`Server error: ${status}`);
          setSuccessMessage(null);
          setOpen(true)
        }
      }
    } catch (error) {
      setErrorMessage(`Error occurs while resetting password: ${error}`);
      setSuccessMessage(null);
      setOpen(true)
    }
  }

  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(null);
    setErrorMessage(null);
    setOpen(false);
  };

  return (
    <Box className='content-center'>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={successMessage ? 'success' : 'error'} sx={{ width: '100%' }}>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
        </Alert>
      </Snackbar>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              width="35px" height="29px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji"
              preserveAspectRatio="xMidYMid meet">
              <path fill="#3B88C3" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z" />
              <path fill="#FFF" d="M12.219 9.621c0-1.55.775-2.697 2.418-2.697h7.689c1.488 0 2.202 1.054 2.202 2.14c0 1.054-.744 2.139-2.202 2.139H16.87v4.527h5.085c1.52 0 2.264 1.054 2.264 2.14c0 1.054-.775 2.139-2.264 2.139H16.87v4.713h5.736c1.488 0 2.201 1.055 2.201 2.14c0 1.055-.744 2.14-2.201 2.14h-7.999c-1.364 0-2.387-.93-2.387-2.325V9.621z" />
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}!
            </Typography>
            <Typography variant='body2'>Please sign-in to your account</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} value={values.email} onChange={handleChange("email")} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <LinkStyled onClick={openSendOTPModal} sx={{ cursor: 'pointer' }}>Forgot Password?</LinkStyled>
              <Modal open={isSendOTPModalOpen} onClose={closeSendOTPModal}>
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="35px" height="29px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji"
                      preserveAspectRatio="xMidYMid meet">
                      <path fill="#3B88C3" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z" />
                      <path fill="#FFF" d="M12.219 9.621c0-1.55.775-2.697 2.418-2.697h7.689c1.488 0 2.202 1.054 2.202 2.14c0 1.054-.744 2.139-2.202 2.139H16.87v4.527h5.085c1.52 0 2.264 1.054 2.264 2.14c0 1.054-.775 2.139-2.264 2.139H16.87v4.713h5.736c1.488 0 2.201 1.055 2.201 2.14c0 1.055-.744 2.14-2.201 2.14h-7.999c-1.364 0-2.387-.93-2.387-2.325V9.621z" />
                    </svg>
                    <Typography
                      variant='h6'
                      sx={{
                        ml: 3,
                        lineHeight: 1,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '1.5rem !important'
                      }}
                    >
                      {themeConfig.templateName}
                    </Typography>
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    Forgot Password
                  </Typography>
                  <TextField
                    label="Email"
                    placeholder="Enter your email"
                    fullWidth
                    margin="normal"
                    value={modalValues.email}
                    onChange={handleModalChange('email')

                    }
                  />
                  <Button variant="contained" color="primary" onClick={handleSendOTP}>
                    Send Code
                  </Button>
                </Paper>

              </Modal>
              <Modal open={isResetPasswordModalOpen} onClose={closeResetPasswordModal}>
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="35px" height="29px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji"
                      preserveAspectRatio="xMidYMid meet">
                      <path fill="#3B88C3" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z" />
                      <path fill="#FFF" d="M12.219 9.621c0-1.55.775-2.697 2.418-2.697h7.689c1.488 0 2.202 1.054 2.202 2.14c0 1.054-.744 2.139-2.202 2.139H16.87v4.527h5.085c1.52 0 2.264 1.054 2.264 2.14c0 1.054-.775 2.139-2.264 2.139H16.87v4.713h5.736c1.488 0 2.201 1.055 2.201 2.14c0 1.055-.744 2.14-2.201 2.14h-7.999c-1.364 0-2.387-.93-2.387-2.325V9.621z" />
                    </svg>
                    <Typography
                      variant='h6'
                      sx={{
                        ml: 3,
                        lineHeight: 1,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '1.5rem !important'
                      }}
                    >
                      {themeConfig.templateName}
                    </Typography>
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    Reset Password
                  </Typography>
                  <TextField
                    type="text"
                    label="OTP"
                    placeholder="Your OTP"
                    autoComplete='off'
                    fullWidth
                    margin="normal"
                    value={modalValues.otp == 0 ? '' : modalValues.otp}
                    onChange={handleModalChange('otp')}
                  />
                  <InputLabel htmlFor='newPassword'>New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    onChange={handleModalChange('newPassword')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <InputLabel htmlFor='confirmPassword'>Confirm Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    onChange={handleModalChange('confirmPassword')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />

                  <Button sx={{ marginTop: 4 }} variant="contained" color="primary" onClick={handleResetpassword}>
                    Confirm
                  </Button>
                </Paper>
              </Modal>
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New member?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {error && (
                <Typography variant="body2" sx={{ color: 'red', marginTop: 2, alignItems: 'center', justifyContent: 'center' }}>
                  {error}
                </Typography>
              )}
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton component='a' onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_HOST}/auth/facebook/login`)}>
                <Facebook sx={{ color: '#497ce2' }} />
              </IconButton>
              <IconButton component='a' onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_HOST}/auth/google/login`)}>
                <Google sx={{ color: '#db4437' }} />
              </IconButton>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
