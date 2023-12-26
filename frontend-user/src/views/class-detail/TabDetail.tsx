import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Card, Divider, InputAdornment, styled } from "@mui/material";
import AccountOutline from "mdi-material-ui/AccountOutline";
import { PeopleAltOutlined } from "@mui/icons-material";
import format from 'date-fns/format';
import { getCookieCustom } from "../../utils/cookies";
import { TimerOutline } from "mdi-material-ui";
import fetchClassDetailTeacher from "src/api/teacher/class/getClassDetail";

const ImgStyled = styled('img')(({ theme }) => ({
    width: 250,
    height: 250,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}));

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

interface ClassDetailProps {
    class_id: string;
}

const TabClassDetail: React.FC<ClassDetailProps> = ({ class_id }) => {
    const [classDetail, setClassDetail] = useState<ClassDetailData | null>(null);

    useEffect(() => {
        if (class_id != undefined) {
            const fetchUserData = async () => {
                try {
                    const data = await fetchClassDetailTeacher(class_id as string, getCookieCustom('accessToken') as string);
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
    }, [class_id]);

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
                </Grid>
            </Grid>
        </Card>
    );
}

export default TabClassDetail;