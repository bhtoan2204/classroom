import { Box, Button, ButtonProps, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, styled } from "@mui/material";
import { ChangeEvent, ElementType, useEffect, useState } from "react";

import { getCookieCustom } from "../../utils/cookies";
import { fetchListStudent } from "src/api/teacher/user/getStudent";
import { mapStudentManually } from "src/api/teacher/user/mapStudentId";

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

interface StudentData {
    student_id: string;
    user: {
        _id: string;
        avatar: string;
        email: string;
        fullname: string;
        is_ban: boolean;
        login_type: string;
    }
}

interface ClassDetailProps {
    class_id: string;
}

const StudentOfClass: React.FC<ClassDetailProps> = ({ class_id }) => {
    const [rows, setRows] = useState<StudentData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [editableStudentIds, setEditableStudentIds] = useState<{ [key: string]: boolean }>({});
    const [editedStudentIds, setEditedStudentIds] = useState<{ [key: string]: string }>({});
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<string>('');
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (studentId: string) => {
        setEditableStudentIds((prevEditableStudentIds) => ({ ...prevEditableStudentIds, [studentId]: true }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, studentId: string) => {
        setEditedStudentIds((prevEditedStudentIds) => ({ ...prevEditedStudentIds, [studentId]: e.target.value }));
    };

    const handleSave = async (userId: string, studentId: string) => {
        if (!editedStudentIds[studentId]) return;
        try {
            const data = await mapStudentManually(class_id, userId, editedStudentIds[studentId], getCookieCustom('accessToken') as string);
            if (data.status === 200) {
                setEditableStudentIds((prevEditableStudentIds) => ({ ...prevEditableStudentIds, [studentId]: false }));
                setEditedStudentIds((prevEditedStudentIds) => ({ ...prevEditedStudentIds, [studentId]: '' }));
            }
        }
        catch (err) {

        }
    };

    const handleCancel = (studentId: string) => {
        setEditableStudentIds((prevEditableStudentIds) => ({ ...prevEditableStudentIds, [studentId]: false }));
        setEditedStudentIds((prevEditedStudentIds) => ({ ...prevEditedStudentIds, [studentId]: '' }));
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (class_id) {
            const fetchStudentData = async () => {
                const accessToken = getCookieCustom('accessToken');
                const { data, status } = await fetchListStudent(class_id, page + 1, rowsPerPage, accessToken as string);
                console.log(data, status)
                if (status === 200) {
                    setRows(data);
                }
            }
            fetchStudentData();
        }
    }, [class_id, page, rowsPerPage, editedStudentIds, isUpdate]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '16.6%' }} align='left'>Avatar</TableCell>
                            <TableCell style={{ width: '16.6%' }}>Student Id</TableCell>
                            <TableCell align='left'>Email</TableCell>
                            <TableCell align='left' style={{ width: '16.6%' }}>Fullname</TableCell>
                            <TableCell align='right' style={{ width: '10.6%' }}>Login Type</TableCell>
                            <TableCell align='right' style={{ width: '10.6%' }}>Is Ban</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 && rows.map(row => (
                            <TableRow
                                key={row.user._id as string}
                                sx={{
                                    "& > *": { borderBottom: "unset" },
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                                        cursor: "pointer"
                                    },
                                    '&:last-of-type td, &:last-of-type th': {
                                        border: 0
                                    }
                                }}>
                                <TableCell component="th" scope="row" style={{ width: '16.6%' }} align='left'>
                                    <img src={row.user.avatar} alt="avatar" width="50px" height="50px" />
                                </TableCell>
                                <TableCell component='th' scope='row' style={{ width: '16.6%' }}>
                                    {editableStudentIds[row.student_id] ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editedStudentIds[row.student_id] || row.student_id || ''}
                                                onChange={(e) => handleInputChange(e, row.student_id)}
                                            />
                                            <button onClick={() => handleSave(row.user._id, row.student_id)}>Save</button>
                                            <button onClick={() => handleCancel(row.student_id)}>Cancel</button>
                                        </>
                                    ) : (
                                        <span
                                            onClick={() => handleEdit(row.student_id)}
                                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                        >
                                            {row.student_id}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell align='left'>{row.user.email}</TableCell>
                                <TableCell align='left' style={{ width: '16.6%' }}>{row.user.fullname}</TableCell>
                                <TableCell align='right' style={{ width: '10.6%' }}>{row.user.login_type}</TableCell>
                                <TableCell align='right' style={{ width: '10.6%' }}>{row.user.is_ban ? 'True' : 'False'}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Notification
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {content}
                    </Typography>
                </Box>
            </Modal>
        </Paper >
    );
}

export default StudentOfClass;