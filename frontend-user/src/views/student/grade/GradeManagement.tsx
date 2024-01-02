import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { GET_getStudentGrade } from 'src/api/student/grade/grade_management/api';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

function GradeManagement({ ClassId }: any) {

    const [gradeCompositions, setGradeCompositions] = useState([])

    useEffect(() => {
        async function fetchGradeComposition() {
            if (ClassId === undefined) {

                return
            }
            const { status, data } = await GET_getStudentGrade(ClassId)
            const compositions: any = data.rows;
            const total_scale: any = data.total_scale;
            const user_total: any = data.user_total
            if (status == 200) {
                const controlledData = compositions.map((value: any) => {
                    const item: any =
                    {
                        key: value.gradeCompo_name,
                        name: value.gradeCompo_name,
                        scale: value.gradeCompo_scale,
                        current_grade: value.current_grade,
                    }

                    return item;
                })

                const separatorRow: any =
                {
                    key: 'separator-row',
                    name: " ",
                    scale: null,
                    current_grade: null,
                }
                const finalRow: any =
                {
                    key: "summary-row",
                    name: "Summary",
                    scale: total_scale,
                    current_grade: user_total,
                }

                controlledData.push(separatorRow)
                controlledData.push(finalRow)

                setGradeCompositions(controlledData)
            }
            else {
                setGradeCompositions([])
            }
        }

        fetchGradeComposition()

    }, [ClassId])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Grade composition name</TableCell>
                            <TableCell align="right">Scale</TableCell>
                            <TableCell align="right">Current grade</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gradeCompositions.map((row: any) => (
                            <TableRow
                                key={row.key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.scale}</TableCell>
                                <TableCell align="right">{row.current_grade}</TableCell>
                                <TableCell align="right">
                                    {
                                        (row.key == "separator-row" || row.key == "summary-row") ?
                                            null :
                                            <Tooltip title={`Ask to review ${row.name}`}>
                                                <Button size='small' style={{ borderRadius: '50%' }}>
                                                    <IconButton>
                                                        <ContactSupportIcon />
                                                    </IconButton>
                                                </Button>
                                            </Tooltip>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default GradeManagement