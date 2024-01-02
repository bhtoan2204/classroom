
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchCreateClass } from "src/api/teacher/class/createClass";
import { fetchMyClass } from "src/api/teacher/class/getAllClass";
import { getCookieCustom } from "src/utils/cookies";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CardImgTop from "src/views/card/CardTop";

const listImage = [
    'a9e7b27a0c5e986a22416d79e2e9dba9.jpg',
    'alvaro-reyes-qWwpHwip31M-unsplash.jpg',
    'annie-spratt-QckxruozjRg-unsplash.jpg',
    'christopher-gower-m_HRfLhgABo-unsplash.jpg',
    'grovemade-RvPDe41lYBA-unsplash.jpg',
    'sai-kiran-anagani-5Ntkpxqt54Y-unsplash.jpg',
    'stillness-inmotion-Jh6aQX-25Uo-unsplash.jpg',
    'stillness-inmotion-YSCCnRGrD-4-unsplash.jpg',
    'true-agency-o4UhdLv5jbQ-unsplash.jpg'
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type ClassData = {
    _id: string,
    className: string,
    description: string
}

const MyClass = () => {
    const [rows, setRows] = useState<ClassData[]>([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();

    const handleCreateClass = async () => {
        await fetchCreateClass(name, description, getCookieCustom('accessToken') as string);
        const accessToken = getCookieCustom('accessToken') as string;
        const response = await fetchMyClass(page + 1, 6, accessToken);

        if (response.status === 200) {
            setRows(response.data.classes);
            setTotalPage(Math.ceil(totalPage + 1 / 6));
            handleClose();
        }
    }

    const nextPage = () => {
        if (page < totalPage - 1) {
            setPage(page + 1);
        }
    }

    const previousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = getCookieCustom('accessToken') as string;
            const response = await fetchMyClass(page + 1, 6, accessToken);

            if (response.status === 200) {
                const totalItem = response.data.totalCount
                setRows(response.data.classes);
                setTotalPage(Math.ceil(totalItem / 6));
            }
            else {
                setRows([]);
            }
        }
        fetchData();
    }, [page]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '2' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <CardImgTop />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, padding: 2 }}>
                        <Button variant='contained' color='primary' onClick={handleOpen}>
                            Add new Class
                        </Button>
                        <Box>
                            <Button variant='contained' color='primary' onClick={previousPage}>
                                <ArrowCircleLeftIcon />
                            </Button>
                            <Button variant='contained' color='primary' onClick={nextPage} sx={{ marginLeft: 2 }}>
                                <ArrowCircleRightIcon />
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                {rows && rows?.map((row, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card sx={{
                            display: 'flex', marginBottom: 2, height: 190,
                            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(-1)}>
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 151,
                                    padding: 1,
                                }}
                                image={`/images/courses/${listImage[(index * (page + 1)) % 9]}`}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {row.className}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {row.description}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <Button onClick={() => router.push('/teacher/class-detail/' + row._id)}>Visit class</Button>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12} sm={12}>
                    <Divider />
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 5 }}>
                        Add new Class
                    </Typography>
                    <TextField
                        fullWidth
                        label="Class Name"
                        value={name}
                        sx={{ marginBottom: 4 }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label="Description"
                        value={description}
                        sx={{ marginBottom: 4 }}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button variant='contained' color='primary' sx={{ marginRight: 2 }}
                        onClick={handleCreateClass}>Add</Button>
                </Box>
            </Modal>
        </Paper >
    );
};

export default MyClass;