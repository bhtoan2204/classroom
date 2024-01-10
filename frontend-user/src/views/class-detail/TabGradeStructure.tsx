import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { OutlinedFlagOutlined } from "@mui/icons-material";
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MultipleNotifications, multipleNotifications } from "src/api/socket";
import { fetchCreateGradeComposition } from "src/api/teacher/grade/addGradeComposition";
import { fetchDeleteGradeComposition } from "src/api/teacher/grade/deleteGradeComposition";
import { fetchGradeStructure } from "src/api/teacher/grade/getGradeComposition";
import { fetchSwapIndex } from "src/api/teacher/grade/swapGradeComposition";
import { fetchUpdateGradeComposition } from "src/api/teacher/grade/updateGradeComposition";
import { fetchMarkGrade } from "src/api/teacher/gradeManagement/markGrade";
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
    const [selectedGradeId, setSelectedGradeId] = useState('');
    const [isEditing, setIsEditing] = useState(false);

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

    const handleEditGradeCompo = (gradeCompo_name: string, gradeCompo_scale: number, _id: string) => {
        setIsEditing(true);
        setName(gradeCompo_name);
        setScale(gradeCompo_scale);
        setSelectedGradeId(_id);
    };

    const handleSaveEdit = async () => {
        const accessToken = getCookieCustom('accessToken') as string;
        const oldName = rows.find(item => item._id === selectedGradeId)?.gradeCompo_name || "";
        await fetchUpdateGradeComposition(class_id, name, oldName, scale, accessToken);
        const updateData = await fetchGradeStructure(class_id, accessToken);
        if (updateData.status === 200) {
            setRows(updateData.data);
            setIsEditing(false);
        }
    };

    const handleDragEnd = async (e: any) => {
        if (!e.destination) return;
        const source_index = e.source.index;
        const destination_index = e.destination.index;
        await fetchSwapIndex(class_id, source_index, destination_index, getCookieCustom('accessToken') as string);
        const updateData = await fetchGradeStructure(class_id, getCookieCustom('accessToken') as string);
        if (updateData.status === 200) {
            setRows(updateData.data);
        }
    };
    const handleMarkFinal = async (gradeCompo_name: string, is_finalized: boolean) => {
        if (is_finalized) return;
        const accessToken = getCookieCustom('accessToken') as string;
        await fetchMarkGrade(class_id, gradeCompo_name, accessToken);
        const updateData = await fetchGradeStructure(class_id, getCookieCustom('accessToken') as string);
        if (updateData.status === 200) {
            setRows(updateData.data);
            const notificationData: MultipleNotifications = {
                class_id: class_id,
                title: 'Grade Composition is finalized',
                content: `Grade Composition ${gradeCompo_name} is finalized`,
                id: class_id,
            }
            multipleNotifications(notificationData);

        }
    }
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
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '5%' }}>Drag</TableCell>
                                <TableCell sx={{ width: '25%' }}>Grade Composition Name</TableCell>
                                <TableCell align='center' sx={{ width: '17.5%' }}>Grade Composition Scale</TableCell>
                                <TableCell align='center' sx={{ width: '17.5%' }}>Is finalized</TableCell>
                                <TableCell align='center' sx={{ width: '17.5%' }}>Update</TableCell>
                                <TableCell align='center' sx={{ width: '17.5%' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <Droppable droppableId="droppable-1">
                            {(provider) => (
                                <TableBody ref={provider.innerRef} {...provider.droppableProps}>
                                    {rows && rows.map((row, index) => (
                                        <Draggable key={row._id} draggableId={row._id} index={index}>
                                            {(provider) => (
                                                <TableRow key={row._id}
                                                    {...provider.draggableProps}
                                                    ref={provider.innerRef}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        {...provider.dragHandleProps}
                                                    >
                                                        <OutlinedFlagOutlined />
                                                    </TableCell>
                                                    <TableCell component='th' scope='row'>
                                                        {isEditing && selectedGradeId === row._id ? (
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        ) : (
                                                            row.gradeCompo_name
                                                        )}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {isEditing && selectedGradeId === row._id ? (
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                type="number"
                                                                value={scale}
                                                                onChange={(e) => setScale(Number(e.target.value))}
                                                            />
                                                        ) : (
                                                            row.gradeCompo_scale
                                                        )}
                                                    </TableCell>
                                                    <TableCell align='center'
                                                        sx={{
                                                            '&:last-of-type td, &:last-of-type th': { border: 0 },
                                                            '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
                                                        }} onClick={() => handleMarkFinal(row.gradeCompo_name, row.is_finalized)}>
                                                        {row.is_finalized ? 'Yes' : 'No'}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {isEditing && selectedGradeId === row._id ? (
                                                            <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                                                                Save Changes
                                                            </Button>
                                                        ) : (
                                                            <Button variant="outlined" onClick={() => handleEditGradeCompo(row.gradeCompo_name, row.gradeCompo_scale, row._id)}>
                                                                Edit
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align='center'
                                                        sx={{
                                                            '&:last-of-type td, &:last-of-type th': { border: 0 },
                                                            '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
                                                        }}
                                                        onClick={handleDeleteGradeCompo(row.gradeCompo_name)}>Delete</TableCell>
                                                </TableRow>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provider.placeholder}
                                </TableBody>)}
                        </Droppable>
                    </Table>
                </DragDropContext>
                {rows.length === 0 && (
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ textAlign: "center", padding: "16px" }}
                    >
                        No Grade Composition have been created yet
                    </Typography>
                )}
            </TableContainer>
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
        </Paper>
    )
}

export default GradeStructure;