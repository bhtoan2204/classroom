import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Box, Button, Card, Collapse, Divider, InputAdornment, List, ListItem, Modal, Typography, styled } from "@mui/material";
import AccountOutline from "mdi-material-ui/AccountOutline";
import { AddBoxOutlined, PeopleAltOutlined } from "@mui/icons-material";
import format from 'date-fns/format';
import { getCookieCustom } from "../../utils/cookies";
import { TimerOutline } from "mdi-material-ui";
import fetchClassDetailTeacher from "src/api/teacher/class/getClassDetail";
import { fetchInvitationCode } from "src/api/teacher/invitation/getInvitationCode";
import { fetchGenerateCode } from "src/api/teacher/invitation/generateCode";
import CardImgTop from "../card/CardTop";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { fetchSendInvitationByEmail } from "src/api/teacher/invitation/sendInvitationByEmail";

interface AssignmentUrlData {
    gradeCompo_name: string,
    url: string,
    is_finalized: boolean
}

const colors = [
    '#acb1d6',
    '#dfd14e',
    '#98473e',
    '#2990a6',
    'error',
    'neural'
];

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
    list_student_url: string;
    list_assignment_url: AssignmentUrlData[];
}

interface ClassDetailProps {
    class_id: string;
}

const TabClassDetail: React.FC<ClassDetailProps> = ({ class_id }) => {
    const [classDetail, setClassDetail] = useState<ClassDetailData | null>(null);
    const [invitationCode, setInvitationCode] = useState<string>('');
    const [invitationLink, setInvitationLink] = useState<string>('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [invitedEmail, setInvitedEmail] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [color, setColor] = useState<'success' | 'error' | 'primary'>('primary');

    const handleSendInvitationEmail = async () => {
        const accessToken = getCookieCustom('accessToken') as string;
        const data = await fetchSendInvitationByEmail(accessToken, invitedEmail, class_id, invitationCode);

        if (data.status === 200) {
            setColor('success');
        }
        else {
            setColor('error');
        }
        setInvitedEmail('');
        setContent(data.message);
    }

    const generateCode = () => {
        const accessToken = getCookieCustom('accessToken') as string;
        const fetchGenerate = async () => {
            const data = await fetchGenerateCode(class_id, accessToken);
            setInvitationCode(data.class_token);
            setInvitationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/join-class?code=${data.class_token}&class_id=${class_id}`)
        }
        fetchGenerate();
    }
    const fetchUserData = async () => {
        try {
            const data = await fetchClassDetailTeacher(class_id as string, getCookieCustom('accessToken') as string);
            const code = await fetchInvitationCode(class_id as string, getCookieCustom('accessToken') as string);

            if (data) {
                setClassDetail(data);
            }
            if (code.status !== 400) {
                setInvitationCode(code.class_token);
                setInvitationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/join-class?code=${code.class_token}&class_id=${class_id}`)
            }
        }
        catch (error) {
            setClassDetail(null);
        }
    };
    useEffect(() => {
        if (class_id != undefined) {
            fetchUserData();
        }
    }, [class_id]);

    return (
        <Card sx={{ padding: 8, marginBottom: 5 }}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                    <CardImgTop />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', order: { xs: 2, sm: 1 } }}>
                    <ImgStyled
                        src={classDetail?.host.avatar === null ? '/images/avatars/1.png' : classDetail?.host.avatar}
                        alt='Profile Pic'
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10%', }}
                    />
                </Grid>
                <Grid item xs={12} sm={9} container spacing={2}>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label='Invite code'
                            minRows={2}
                            value={invitationCode}
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
                    <Grid item xs={12} sm={1}>
                        <Button variant='contained' color='primary' sx={{ height: '90%' }} onClick={generateCode}>
                            <AddBoxOutlined />
                        </Button>
                    </Grid>
                    <Grid item sm={12}><Divider /></Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            label='Link invitation'
                            minRows={2}
                            value={invitationLink}
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
                    <Grid item xs={12} sm={12}>
                        <Button variant="contained" color="primary" onClick={() => { setIsOpen(true) }}>
                            Invite by Email
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Typography
                component="div"
                variant="h5"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    marginBottom: 2
                }}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                List Uploaded Assignment
                {isCollapsed ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Typography>
            <Modal open={isOpen} onClose={() => {
                setIsOpen(false);
                setContent('');
                setColor('primary');
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Send Invitation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: 3 }}>
                        <TextField
                            fullWidth
                            label='Email'
                            value={invitedEmail}
                            onChange={(e) => setInvitedEmail(e.target.value)}
                        />
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleSendInvitationEmail}>
                        Send
                    </Button>
                    <Typography sx={{ marginTop: 2, color: { color } }}>
                        {content}
                    </Typography>
                </Box>
            </Modal>
            <Collapse in={!isCollapsed} sx={{ transitionDuration: '0.3s' }}>
                {classDetail?.list_assignment_url.length === 0 ? (
                    <Typography variant="h6" component="div" sx={{ textAlign: "center", padding: "16px" }}>
                        No Grade Composition have been uploaded yet
                    </Typography>
                ) : (
                    <List>
                        {classDetail?.list_assignment_url.map((item, index) => (
                            <ListItem key={item.gradeCompo_name}
                                sx={{
                                    transition: 'transform 0.3s ease-in-out',
                                    ":hover": {
                                        transform: 'scale(1.05)',
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)'
                                    }
                                }}>
                                <Box sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'
                                }} >
                                    <Typography variant="h6" component="div" sx={{ textAlign: "center", padding: "16px" }}>
                                        {item.gradeCompo_name}
                                    </Typography>
                                    <Button variant='contained' color='primary' href={item.url} target='_blank'
                                        sx={{ backgroundColor: `${colors[index % 6]}`, margin: 1, borderRadius: 2, }}>Download</Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Collapse>
        </Card >
    );
}

export default TabClassDetail;
