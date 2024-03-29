import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'


import Google from 'mdi-material-ui/Google'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import themeConfig from 'src/configs/themeConfig'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { DateField, LocalizationProvider } from '@mui/x-date-pickers'

import dayjs from 'dayjs';
import fetchSendOtpRegister from 'src/api/user/sendOtpRegister'
import { useRouter } from 'next/router'
import { Snackbar } from '@mui/material'
import fetchRegister from 'src/api/user/signup'

interface State {
  email: string
  fullname: string
  birthday: Date
  password: string
  otp: string
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
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))


const RegisterPage = () => {
  const [values, setValues] = useState<State>({
    email: '',
    fullname: '',
    birthday: new Date(),
    password: '',
    otp: '',
    showPassword: false
  });

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [color, setColor] = useState<string>('red');
  const [open, setOpen] = useState<boolean>(false);

  // const theme = useTheme()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleSendOTP = async () => {
    const response = await fetchSendOtpRegister(values.email);
    if (response.status === 200) {
      setIsError(true);
      setColor('green');
      setError("Send OTP successfully");
    }
    else {
      setIsError(true);
      setColor('red');
      setError(response.errorData.message);
    }
  }
  const handleRegister = async () => {
    const response = await fetchRegister(values.email, values.fullname, values.password, values.birthday.toDateString(), parseInt(values.otp));
    if (response.status === 200) {
      setOpen(true);
      setValues({ email: '', fullname: '', password: '', otp: '', showPassword: false, birthday: new Date() });

    }
    else {
      setIsError(true);
      setColor('red');
      setError(response.errorData.message);
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              width="35px" height="29px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji"
              preserveAspectRatio="xMidYMid meet">
              <path fill="#3B88C3" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z" />
              <path fill="#FFF" d="M12.219 9.621c0-1.55.775-2.697 2.418-2.697h7.689c1.488 0 2.202 1.054 2.202 2.14c0 1.054-.744 2.139-2.202 2.139H16.87v4.527h5.085c1.52 0 2.264 1.054 2.264 2.14c0 1.054-.775 2.139-2.264 2.139H16.87v4.713h5.736c1.488 0 2.201 1.055 2.201 2.14c0 1.055-.744 2.14-2.201 2.14h-7.999c-1.364 0-2.387-.93-2.387-2.325V9.621z" />
            </svg>

            {/* <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg> */}
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
              Getting started
            </Typography>
            <Typography variant='body2'>Create an account to join with us</Typography>
          </Box>
          <TextField autoFocus fullWidth id='fullname' label='Fullname' sx={{ marginBottom: 4 }} />
          <TextField fullWidth type='email' label='Email' sx={{ marginBottom: 4 }} onChange={handleChange('email')} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Birth Date"
              value={dayjs(values.birthday)}
              onChange={(selectedDate) => { setValues({ ...values, birthday: selectedDate?.toDate() || new Date() }); }}
              sx={{ width: '100%', marginBottom: 4 }}
            />
          </LocalizationProvider>

          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              id='auth-register-password'
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
                    {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box display="flex" alignItems="center" marginBottom={4}>
            <TextField fullWidth type='otp' label='OTP' sx={{ flex: '7' }} onChange={handleChange('otp')} />
            <Button fullWidth variant="contained" color="primary" sx={{ flex: '2', marginLeft: 1 }} onClick={handleSendOTP}>
              Send OTP
            </Button>
          </Box>

          {isError ? <Typography variant='body2' sx={{ color: { color } }}>{error}</Typography> : null}

          <FormControlLabel
            control={<Checkbox />}
            label={
              <Fragment>
                <span>I agree to </span>
                <Link href='/dashboard' passHref>
                  <LinkStyled onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                    privacy policy & terms
                  </LinkStyled>
                </Link>
              </Fragment>
            }
          />
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }} onClick={handleRegister}>
            Sign up
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ marginRight: 2 }}>
              Already have an account?
            </Typography>
            <Typography variant='body2'>
              <Link passHref href='/pages/login'>
                <LinkStyled>Click here</LinkStyled>
              </Link>
            </Typography>
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
        </CardContent>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Create account successfully"
        />
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
