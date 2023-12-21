import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Alert, AlertTitle, Card, CardHeader, Divider, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import AccountOutline from "mdi-material-ui/AccountOutline";
import { Close, PeopleAltOutlined } from "@mui/icons-material";
import format from 'date-fns/format';
import { getCookieCustom } from "../../utils/cookies";
import { TimerOutline } from "mdi-material-ui";
import { fetchActiveClass } from "src/api/classManage/activeClass";
import { fetchClassDetail } from "src/api/classManage/getClassDetails";
import { fetchTeacherOfClass } from "src/api/classManage/getTeacher";

const ImgStyled = styled('img')(({ theme }) => ({
    width: 250,
    height: 250,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

interface ClassDetailData {
    id: string;
    className: string;
    description: string;
    host: {
        id: string;
        fullname: string;
        avatar: string;
    };
    createdAt: Date;
    is_active: string;
}

interface TeacherData {
    id: string;
    avatar: string;
    fullname: string;
    email: string;
    login_type: string;
    is_ban: boolean;
}

const TeacherTable: React.FC<ClassDetailProps> = ({ class_id }) => {
    const [teacherData, setTeacherData] = useState<TeacherData[]>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchTeachers = async () => {
            const data = await fetchTeacherOfClass(class_id as string, getCookieCustom('accessToken') as string);
            if (data.status === 201) {
                setTeacherData(data.data);
            }
        }
        fetchTeachers();
    }, [class_id]);

    return (
        <Card sx={{ marginTop: 5 }}>
            <CardHeader title='Teachers' titleTypographyProps={{ variant: 'h6' }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '12%' }} align='center'>Avatar</TableCell>
                            <TableCell style={{ width: '22%' }} align='left'>Fullname</TableCell>
                            <TableCell style={{ width: '22%' }} align='left'>Email</TableCell>
                            <TableCell style={{ width: '22%' }} align='center'>Login type</TableCell>
                            <TableCell style={{ width: '22%' }} align='center'>Is ban</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teacherData.map((row) => (
                            <TableRow
                                key={row.id}
                                onClick={() => {
                                    if (row.id === '' || row.id === undefined) return;
                                    router.push(`/user-detail/${row.id}`)
                                }}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    "& > *": { borderBottom: "unset" },
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                                        cursor: "pointer"
                                    },
                                    '&:last-of-type td, &:last-of-type th': {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell style={{ width: '12%' }} component='th' scope='row' align='center'>
                                    <ImgStyled
                                        src={row.avatar === null ? '/images/avatars/1.png' : row.avatar}
                                        alt='Profile Pic'
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover', padding: 1, borderRadius: '10%' }}
                                    />
                                </TableCell>
                                <TableCell style={{ width: '22%' }} align='left'>{row.fullname}</TableCell>
                                <TableCell style={{ width: '22%' }} align='left'>{row.email}</TableCell>
                                <TableCell style={{ width: '22%' }} align='center'>{row.login_type}</TableCell>
                                <TableCell style={{ width: '22%' }} align='center'>{row.is_ban ? 'True' : 'False'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

interface ClassDetailProps {
    class_id: string;
}

const ClassDetail: React.FC<ClassDetailProps> = ({ class_id }) => {
    const [clickActive, setClickActive] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success')
    const [classDetail, setClassDetail] = useState<ClassDetailData | null>(null);

    const activeClass = async () => {
        const data = await fetchActiveClass(class_id as string, getCookieCustom('accessToken') as string);
        if (data.status === 200) {
            setClickActive(!clickActive);
            setOpenAlert(true);
            setContent(data.data.message);
            setSeverity('success');
        }
        else {
            setOpenAlert(true);
            setContent("Something went wrong!");
            setSeverity('error');
        }
    }

    useEffect(() => {
        if (class_id != undefined) {
            const fetchUserData = async () => {
                try {
                    const data = await fetchClassDetail(class_id as string, getCookieCustom('accessToken') as string);
                    console.log(data);
                    if (data) {
                        setClassDetail(data);
                    }
                    else {
                        setClassDetail(null);
                    }
                }
                catch (error) {
                    setClassDetail(null);
                }
            };
            if (class_id) {
                fetchUserData()
            }
        }
    }, [class_id, clickActive]);

    return (
        <Card sx={{ padding: 8 }}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={3} sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', order: { xs: 2, sm: 1 } }}>
                    <ImgStyled
                        src={classDetail?.host.avatar === null ? '/images/avatars/1.png' : classDetail?.host.avatar}
                        alt='Profile Pic'
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10%', }}
                    />
                </Grid>
                <Grid item xs={12} sm={9} container spacing={2}>
                    <Grid item sm={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Class Name'
                            value={classDetail?.className || ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <PeopleAltOutlined />
                                    </InputAdornment>
                                ),
                                readOnly: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            label='Class Description'
                            minRows={2}
                            multiline
                            value={classDetail?.description || ''}
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
                            label='Host Name'
                            minRows={2}
                            value={classDetail?.host.fullname || ''}
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
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label='Created At'
                            minRows={2}
                            value={classDetail?.createdAt ? format(new Date(classDetail.createdAt), 'MM/dd/yyyy') : ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <TimerOutline />
                                    </InputAdornment>
                                ),
                                readOnly: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            fullWidth
                            label='Is Active'
                            minRows={2}
                            value={classDetail?.is_active}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start' />
                                ),
                                readOnly: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <Button sx={{ marginTop: 2 }} variant='contained' onClick={activeClass}>
                            {classDetail?.is_active ? 'Inactive this class' : 'Active this class'}
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
            <TeacherTable class_id={class_id} />
        </Card>
    );
}

export default ClassDetail;
