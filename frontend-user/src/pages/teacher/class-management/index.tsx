import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchCreateClass } from "src/api/teacher/class/createClass";
import { fetchMyClass } from "src/api/teacher/class/getAllClass";
import { getCookieCustom } from "src/utils/cookies";

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const router = useRouter();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleCreateClass = async () => {
        await fetchCreateClass(name, description, getCookieCustom('accessToken') as string);
        const accessToken = getCookieCustom('accessToken') as string;
        const response = await fetchMyClass(page + 1, rowsPerPage, accessToken);

        if (response.status === 200) {
            setRows(response.data.classes);
            setTotalItem(response.data.totalCount);
            handleClose();
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = getCookieCustom('accessToken') as string;
            const response = await fetchMyClass(page + 1, rowsPerPage, accessToken);

            if (response.status === 200) {
                setRows(response.data.classes);
                setTotalItem(response.data.totalCount);
            }
            else {
            }
        }
        fetchData();
    }, [page, rowsPerPage]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '40%' }}>Class Name</TableCell>
                            <TableCell align='left' sx={{ width: '60%' }}>Class Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map(row => (
                            <TableRow
                                key={row._id}
                                sx={{
                                    '&:last-of-type td, &:last-of-type th': { border: 0 },
                                    '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
                                }} onClick={() => { router.push('/teacher/class-detail/' + row._id) }}>
                                <TableCell component='th' scope='row' sx={{ width: '40%' }}>
                                    {row.className}
                                </TableCell>
                                <TableCell align='left' sx={{ width: '60%' }}>
                                    {row.description}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component='div'
                    count={totalItem}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Button variant='contained' color='primary' sx={{ margin: 2 }} onClick={handleOpen}>Add new Class</Button>
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
                        label="Grade Composition Name"
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
        </Paper>
    );
};

export default MyClass;