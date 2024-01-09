import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { POST_joinClassByLink } from 'src/api/student/class/join_class/api';
import { fetchJoinClass } from 'src/api/teacher/invitation/joinClass';
import { getCookieCustom } from 'src/utils/cookies';

const JoinClassPage = () => {
    const router = useRouter();
    const { query } = router;

    const { code, class_id } = query;

    useEffect(() => {
        const role = getCookieCustom('role') as string;
        const joinClassByTeacher = async () => {
            const accessToken = getCookieCustom('accessToken') as string;
            await fetchJoinClass(class_id as string, code as string, accessToken);
        }
        const joinClassByStudent = async () => {
            await POST_joinClassByLink(class_id as string, code as string);
        }
        if (class_id !== undefined && code !== undefined) {
            if (role === 'teacher') {
                joinClassByTeacher();
                router.push(`/teacher/class-detail/${class_id}`);
            }
            else if (role === 'student') {
                joinClassByStudent();
                router.push(`/student/class-detail/${class_id}`);
            }
        }
    }, [code, class_id, router])

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
            <CircularProgress />
        </Box>
    );
};

export default JoinClassPage;