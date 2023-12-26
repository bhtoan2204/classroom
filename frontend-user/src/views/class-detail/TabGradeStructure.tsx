import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCreateGradeComposition } from "src/api/teacher/grade/addGradeComposition";
import { fetchDeleteGradeComposition } from "src/api/teacher/grade/deleteGradeComposition";
import { fetchGradeStructure } from "src/api/teacher/grade/getGradeComposition";
import { fetchUpdateGradeComposition } from "src/api/teacher/grade/updateGradeComposition";
import { getCookieCustom } from "src/utils/cookies";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ClassDetailProps {
    class_id: string;
}

interface GradeCompoData {
    _id: string;
    gradeCompo_name: string;
    gradeCompo_scale: number;
    is_finalized: boolean;
}

const GradeStructure: React.FC<ClassDetailProps> = ({ class_id }) => {
    const [rows, setRows] = useState<GradeCompoData[]>([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [scale, setScale] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddGradeCompo = (gradeCompo_name: string, gradeCompo_scale: number) => {
        return async () => {
            const accessToken = getCookieCustom('accessToken') as string;
            await fetchCreateGradeComposition(class_id, gradeCompo_name, gradeCompo_scale, accessToken);
            const updateData = await fetchGradeStructure(class_id, accessToken);
            if (updateData.status === 200) {
                setRows(updateData.data);
                setOpen(false);
            }
        }
    };

    const handleUpdateGradeCompo = (gradeCompo_name: string, gradeCompo_oldName: string, gradeCompo_scale: number) => {
        return async () => {
            const accessToken = getCookieCustom('accessToken') as string;
            await fetchUpdateGradeComposition(class_id, gradeCompo_name, gradeCompo_oldName, gradeCompo_scale, accessToken);
            const updateData = await fetchGradeStructure(class_id, accessToken);
            if (updateData.status === 200) {
                setRows(updateData.data);
            }
        }
    }

    const handleMarkFinalized = (gradeCompo_name: string) => {
        console.log('a')
    };

    const handleDeleteGradeCompo = (gradeCompo_name: string) => {
        return async () => {
            const accessToken = getCookieCustom('accessToken') as string;
            await fetchDeleteGradeComposition(class_id, gradeCompo_name, accessToken);
            const updateData = await fetchGradeStructure(class_id, accessToken);
            if (updateData.status === 200) {
                setRows(updateData.data);
            }
        }
    }

    useEffect(() => {
        const fetchGradeCompo = async () => {
            const accessToken = getCookieCustom('accessToken') as string;
            const response = await fetchGradeStructure(class_id, accessToken);
            if (response.status === 200) {
                setRows(response.data);
            }
        };
        fetchGradeCompo();
    }, [class_id])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '30%' }}>Grade Composition Name</TableCell>
                            <TableCell align='center' sx={{ width: '17.5%' }}>Grade Composition Scale</TableCell>
                            <TableCell align='center' sx={{ width: '17.5%' }}>Is finalized</TableCell>
                            <TableCell align='center' sx={{ width: '17.5%' }}>Action</TableCell>
                            <TableCell align='center' sx={{ width: '17.5%' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map(row => (
                            <TableRow
                                key={row._id}>
                                <TableCell component='th' scope='row'>
                                    {row.gradeCompo_name}
                                </TableCell>
                                <TableCell align='center'>{row.gradeCompo_scale}</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        '&:last-of-type td, &:last-of-type th': { border: 0 },
                                        '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
                                    }}
                                    onClick={() => handleMarkFinalized(row.gradeCompo_name)}
                                >{row.is_finalized ? 'Yes' : 'No'}</TableCell>

                                <TableCell align='center'
                                    sx={{
                                        '&:last-of-type td, &:last-of-type th': { border: 0 },
                                        '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
                                    }}
                                    onClick={handleDeleteGradeCompo(row.gradeCompo_name)}>Delete</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        '&:last-of-type td, &:last-of-type th': { border: 0 },
                                        '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
                                    }}
                                    onClick={handleDeleteGradeCompo(row.gradeCompo_name)}>Update</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <Button variant='contained' color='primary' sx={{ margin: '10px' }}
                        onClick={handleOpen}>Add Grade Composition</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 5 }}>
                                Add new Grade Composition
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
                                label="Scale"
                                value={scale}
                                sx={{ marginBottom: 4 }}
                                onChange={(e) => setScale(parseInt(e.target.value))}
                                inputProps={{
                                    type: 'number',
                                    pattern: '[0-9]*',
                                }}
                            />
                            <Button variant='contained' color='primary' sx={{ marginRight: 2 }}
                                onClick={handleAddGradeCompo(name, scale)}>Add</Button>
                        </Box>
                    </Modal>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default GradeStructure;