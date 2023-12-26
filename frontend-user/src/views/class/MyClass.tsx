import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchMyClass } from "src/api/teacher/class/getAllClass";
import { getCookieCustom } from "src/utils/cookies";

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
    const router = useRouter();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = getCookieCustom('accessToken') as string;
            const response = await fetchMyClass(page + 1, rowsPerPage, accessToken);

            if (response.status === 200) {
                setRows(response.data.classes);
                setTotalItem(response.data.totalCount);
            }
            else {
                console.log(response.errorData.message);
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
        </Paper>
    );
};

export default MyClass;