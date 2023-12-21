import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Alert, AlertTitle, Card, CardHeader, CircularProgress, Divider, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import AccountOutline from "mdi-material-ui/AccountOutline";
import EmailOutline from "mdi-material-ui/EmailOutline";
import { Close } from "@mui/icons-material";
import ErrorFetch from "../fetchError";
import format from 'date-fns/format';
import { getCookieCustom } from "../../utils/cookies";
import { fetchBanAccount } from "src/api/userManage/banAccount";
import { fetchUserDetail } from "src/api/userManage/getUserDetail";

const ImgStyled = styled('img')(({ theme }) => ({
    width: 250,
    height: 250,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

interface Classes {
    class_id: string;
    class_name: string;
    class_description: string;
}

interface UserDetail {
    _id: string,
    email: string,
    fullname: string,
    role: string,
    avatar: string,
    birthday: Date,
    login_type: string,
    is_ban: boolean,
    createdAt: Date,
    updatedAt: Date,
    classes: Classes[]
}

const UserDetail = () => {
    const router = useRouter();
    const { user_id } = router.query;
    const [profile, setProfile] = useState<UserDetail | null>(null)
    const [clickBan, setClickBan] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success')
    const [loading, setLoading] = useState(true);

    const banAccount = async () => {
        const { user_id } = router.query;
        const data = await fetchBanAccount(user_id as string, getCookieCustom('accessToken') as string);

        if (data.status === 200) {
            setSeverity('success');
            setContent(data.data.message);
            setOpenAlert(true);
            setClickBan(!clickBan)
        }
        else {
            setSeverity('error');
            setContent(data.errorData.message);
            setOpenAlert(true);
            setClickBan(!clickBan)
        }
    }

    useEffect(() => {
        const { user_id } = router.query;
        const fetchUserData = async () => {
            try {
                const data = await fetchUserDetail(user_id as string, getCookieCustom('accessToken') as string);
                if (data.status === 200) {
                    setProfile(data.data);
                }
                else {
                    setProfile(null);
                }
            }
            catch (error) {
                console.error('Error during fetch user detail:', error);
            }
            finally {
                setLoading(false);
            }
        }
        if (user_id) {
            fetchUserData()
        }
    }, [user_id, clickBan, router.query]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </div>
        );
    }
    if (profile === null) return (<ErrorFetch />)

    else {
        return (
            <Card sx={{ padding: 8 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3} sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', order: { xs: 2, sm: 1 } }}>
                        <ImgStyled
                            src={profile?.avatar === null ? '/images/avatars/1.png' : profile?.avatar}
                            alt='Profile Pic'
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10%', }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9} container spacing={2}>
                        <Grid item sm={12}>
                            <Typography variant='h4' sx={{ marginBottom: 2, marginLeft: 4 }}>
                                User Information
                            </Typography>
                        </Grid>
                        <Grid item sm={12}><Divider /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label='Full Name'
                                value={profile?.fullname || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountOutline />
                                        </InputAdornment>
                                    ),
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type='email'
                                label='Email'
                                value={profile?.email || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailOutline />
                                        </InputAdornment>
                                    ),
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Created At'
                                minRows={2}
                                value={profile?.createdAt || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start' />
                                    ),
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Update At'
                                minRows={2}
                                value={profile?.updatedAt || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start' />
                                    ),
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                fullWidth
                                label='Role'
                                minRows={2}
                                placeholder='Role'
                                value={profile?.role || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start' />
                                    ),
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='Login Type'
                                minRows={2}
                                placeholder='Login type'
                                value={profile?.login_type || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start' />
                                    ),
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='Birthday'
                                minRows={2}
                                placeholder='MM/DD/YYYY'
                                value={profile?.birthday ? format(new Date(profile.birthday), 'MM/dd/yyyy') : ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start' />
                                    ),
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                fullWidth
                                label='Is Ban'
                                minRows={2}
                                placeholder='MM/DD/YYYY'
                                value={(profile?.is_ban ? 'Yes' : 'No') || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start' />
                                    ),
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Button sx={{ marginTop: 2 }} variant='contained' onClick={banAccount}>
                                {profile?.is_ban ? 'Unban this account' : 'Ban this account'}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={9} >
                            {openAlert ? (
                                <Alert
                                    severity={severity}
                                    sx={{ '& a': { fontWeight: 400 }, maxHeight: 45 }}
                                    action={
                                        <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                                            <Close fontSize='inherit' />
                                        </IconButton>
                                    }
                                >
                                    <AlertTitle>{content}</AlertTitle>
                                </Alert>
                            ) : null}
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
                <Card sx={{ marginTop: 5 }}>
                    <CardHeader title='Joined Classes' titleTypographyProps={{ variant: 'h6' }} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Class name</TableCell>
                                    <TableCell align='left'>Class Description</TableCell>
                                    <TableCell align='left'>Class Id</TableCell>
                                    <TableCell align='left'>Is Active</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {profile?.classes.map(row => (
                                    <TableRow key={row.class_id} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                                        <TableCell component='th' scope='row'>
                                            {row.class_name}
                                        </TableCell>
                                        <TableCell align='left'>{row.class_description}</TableCell>
                                        <TableCell align='left'>{row.class_id.toString()}</TableCell>
                                        <TableCell align='left'>True</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Card>
        );
    }
}

export default UserDetail;
