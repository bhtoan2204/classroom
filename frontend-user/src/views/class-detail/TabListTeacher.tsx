import { CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { Card } from "mdi-material-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchTeacherOfClass } from "src/api/teacher/user/getTeacher";
import { getCookieCustom } from "src/utils/cookies";

const ImgStyled = styled('img')(({ theme }) => ({
    width: 250,
    height: 250,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))


interface TeacherData {
    id: string;
    avatar: string;
    fullname: string;
    email: string;
    login_type: string;
    is_ban: boolean;
}

interface ClassDetailProps {
    class_id: string;
}

const ListTeacher: React.FC<ClassDetailProps> = ({ class_id }) => {
    const [teacherData, setTeacherData] = useState<TeacherData[]>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchTeachers = async () => {
            const data = await fetchTeacherOfClass(class_id as string, getCookieCustom('accessToken') as string);
            if (data.status === 200) {
                setTeacherData(data.data);
            }
        }
        fetchTeachers();
    }, [class_id]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '12%' }} align='left'>Avatar</TableCell>
                        <TableCell style={{ width: '22%' }} align='left'>Fullname</TableCell>
                        <TableCell style={{ width: '22%' }} align='left'>Email</TableCell>
                        <TableCell style={{ width: '22%' }} align='center'>Login type</TableCell>
                        <TableCell style={{ width: '22%' }} align='center'>Is ban</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teacherData.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                "& > *": { borderBottom: "unset" },
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                                    cursor: "pointer"
                                },
                                '&:last-of-type td, &:last-of-type th': {
                                    border: 0
                                }
                            }}
                        >
                            <TableCell component="th" scope="row" style={{ width: '16.6%' }} align='left'>
                                <img src={row.avatar} alt="avatar" width="100px" height="100px" />
                            </TableCell>
                            <TableCell style={{ width: '22%' }} align='left'>{row.fullname}</TableCell>
                            <TableCell style={{ width: '22%' }} align='left'>{row.email}</TableCell>
                            <TableCell style={{ width: '22%' }} align='center'>{row.login_type}</TableCell>
                            <TableCell style={{ width: '22%' }} align='center'>{row.is_ban ? 'True' : 'False'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListTeacher;