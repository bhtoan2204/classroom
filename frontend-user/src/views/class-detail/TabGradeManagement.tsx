import { Button, FormControl, Grid, MenuItem, Modal, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchDownloadAssignment } from "src/api/teacher/gradeManagement/downloadSpecifiedAssignment";
import { fetchDownloadStudentList } from "src/api/teacher/gradeManagement/downloadStudentList";
import { fetchGradeBoard } from "src/api/teacher/gradeManagement/getGradeBoard";
import { getCookieCustom } from "src/utils/cookies";
import MaterialTable, { Column } from 'material-table';
import { fetchInputGrade } from "src/api/teacher/gradeManagement/inputGrade";
import { CSVLink } from 'react-csv';

interface GradeData {
    user_id: string;
    studentName: string;
    studentId: string;
    grades: { [key: string]: number | null };
}

interface ClassDetailProps {
    class_id: string;
}

const GradeManagement: React.FC<ClassDetailProps> = ({ class_id }) => {
    const [open, setOpen] = useState(false);
    const [gradeData, setGradeData] = useState<GradeData[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [columns, setColumns] = useState<Column<GradeData>[]>([]);
    const [csvData, setCsvData] = useState([]);

    const handleUpdateGradeBoard = async (updatedColumns: { [key: string]: any }, user_id: string) => {
        const keyValues = updatedColumns.grades;
        console.log(user_id);
        for (const key in keyValues) {
            const name = key;
            const value = keyValues[key];
            if (value !== null) {
                await fetchInputGrade(user_id, class_id, name, value, getCookieCustom('accessToken') as string);
            }
        }
    }

    const DownloadStudentList = async () => {
        try {
            const blobData = await fetchDownloadStudentList(class_id, getCookieCustom('accessToken') as string);
            const url = window.URL.createObjectURL(blobData);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'list_student_template.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const DownloadSpecifiedAssignment = async () => {
        try {
            const blobData = await fetchDownloadAssignment(class_id, selectedItem, getCookieCustom('accessToken') as string);
            const url = window.URL.createObjectURL(blobData);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'list_student_template.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    const UploadStudentList = async () => {
        console.log('goes here')
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectedItem(event.target.value as string);
    };

    const handleExportCSV = async () => {
        try {
            const { data } = await fetchGradeBoard(class_id, getCookieCustom('accessToken') as string);
            setGradeData(data);
            const csvFormattedData = data.map(({ user_id, studentName, studentId, grades }: GradeData) => ({
                user_id,
                studentName,
                studentId: studentId.toString().replace(/\D/g, ''),
                ...grades,
                overall: calculateOverallGrade(grades),
            }));
            setCsvData(csvFormattedData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const calculateOverallGrade = (grades: { [key: string]: number | null }): number => {
        const values = Object.values(grades).filter((value) => value !== null) as number[];
        const sum = values.reduce((acc, value) => acc + value, 0);

        return isNaN(sum) ? 0 : sum;
    };

    useEffect(() => {
        const getGradeBoard = async () => {
            try {
                const { data } = await fetchGradeBoard(class_id, getCookieCustom('accessToken') as string);
                setGradeData(data);
                const columns: Column<GradeData>[] = [
                    { title: 'Student ID', field: 'studentId', editable: 'never' },
                    { title: 'Student Name', field: 'studentName', editable: 'never' },
                ];

                if (data[0] && data[0].grades) {
                    Object.keys(data[0].grades).forEach((item) => {
                        columns.push({
                            title: item,
                            field: `grades.${item}`,
                            type: 'numeric',
                        })
                    })
                }
                columns.push({
                    title: 'Overall',
                    field: 'overall',
                    editable: 'never',
                    type: 'numeric',
                    render: (rowData) => calculateOverallGrade(rowData.grades),
                });

                const csvFormattedData = data.map(({ user_id, studentName, studentId, grades }: GradeData) => ({
                    user_id,
                    studentName,
                    studentId: studentId.toString().replace(/\D/g, ''),
                    ...grades,
                    overall: calculateOverallGrade(grades),
                }));
                setCsvData(csvFormattedData);
                setColumns(columns);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getGradeBoard();
    }, [class_id])

    return (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={9}>
                <Paper style={{ padding: '20px' }}>
                    <MaterialTable
                        title="Grade Board"
                        columns={columns}
                        data={gradeData}
                        editable={{
                            onRowUpdate: (newData: any, oldData: any) =>
                                new Promise<void>((resolve) => {
                                    setTimeout(() => {
                                        const index = oldData ? gradeData.indexOf(oldData) : -1;
                                        if (index !== -1) {
                                            const updatedData = [...gradeData];
                                            updatedData[index] = newData;
                                            const updatedColumns: { [key: string]: any } = {};
                                            Object.keys(newData).forEach(key => {
                                                if (oldData[key] !== newData[key]) {
                                                    updatedColumns[key] = newData[key];
                                                }
                                            });
                                            handleUpdateGradeBoard(updatedColumns, newData.user_id);
                                            setGradeData(updatedData);
                                        }
                                        resolve();
                                    }, 600);
                                }),
                        }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Button variant="contained" style={{ marginBottom: '10px' }} onClick={DownloadStudentList}>
                            Download Student List
                        </Button>
                        <Button variant="contained" style={{ marginBottom: '10px' }} onClick={UploadStudentList}>
                            Upload Student List
                        </Button>
                        <Button variant="contained" style={{ marginBottom: '10px' }} onClick={() => setOpen(true)}>
                            Download Specified Assignment
                        </Button>
                        <Button variant="contained" style={{ marginBottom: '10px' }}>
                            Upload Specified Assignment
                        </Button>
                        <CSVLink
                            data={csvData}
                            filename={`grade_board_${class_id}.csv`}
                            style={{ width: '100%', marginBottom: '10px', textDecoration: 'none' }}
                            onClick={handleExportCSV}
                        >
                            <Button variant="contained" style={{ width: '100%' }}>
                                Export Grade Board (CSV)
                            </Button>
                        </CSVLink>
                    </div>
                </Paper>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
                        <FormControl fullWidth>
                            <Typography variant="h6" gutterBottom>
                                Select a grade composition
                            </Typography>
                            <Select value={selectedItem} label="Assignment" onChange={(event: SelectChangeEvent) => handleSelectChange(event)} style={{ marginBottom: '20px' }}>
                                {gradeData.length > 0 && gradeData[0].grades && Object.keys(gradeData[0].grades).map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Button variant="contained" onClick={DownloadSpecifiedAssignment}>
                                Download
                            </Button>
                        </FormControl>
                    </Paper>
                </Modal>
            </Grid>
        </Grid >
    )
}

export default GradeManagement;