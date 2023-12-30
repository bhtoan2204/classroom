import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Grid, Paper } from '@mui/material';
import { getCookieCustom, setCookieCustom } from 'src/utils/cookies';
import fetchAssignRole from 'src/api/user/assign-role';
import { useRouter } from 'next/router';

interface ImageComponentProps {
    src: string;
    alt: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt }) => {
    const [hovered, setHovered] = React.useState(false);
    const router = useRouter();
    const onImageClick = async (role: string) => {
        const accessToken = getCookieCustom('accessToken') as string;
        const response = await fetchAssignRole(accessToken, role.toLowerCase());
        if (response.status === 200) {
            setCookieCustom('role', role.toLowerCase(), 100);

            router.push('/dashboard');
        }
        else {
        }
    }

    return (
        <div
            style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onImageClick(alt)}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: 'auto',
                    transition: 'transform 0.3s ease',
                    transform: hovered ? 'scale(1.1)' : 'scale(1)',
                }}
            />
            {hovered && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    {alt}
                </div>
            )}
        </div>
    );
};

const images = [
    { id: 1, src: '/images/role/teacher-vector.jpg', alt: 'Teacher', role: 'teacher' },
    { id: 2, src: '/images/role/student-vector.jpg', alt: 'Student', role: 'student' },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {

    return (
        <div>
            <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography sx={{ flex: 'center' }} id="modal-modal-title" variant="h6" component="h2">
                        Select your role
                    </Typography>
                    <Container>
                        <Grid container spacing={2}>
                            {images.map((image) => (
                                <Grid item key={image.id} xs={6}>
                                    <Paper>
                                        <ImageComponent src={image.src} alt={image.alt} />
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Modal>
        </div>
    );
}
