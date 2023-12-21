import { useState, ChangeEvent, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useRouter } from 'next/router';
import { fetchClasses } from 'src/api/classManage/getClasses';
import { getCookieCustom } from '../../utils/cookies';


interface Data {
  _id: string;
  id: string;
  className: string;
  description: string;
  host: {
    id: string;
    fullname: string;
  };
  createdAt: Date;
  is_active: string;
}

const active_list = [null, true, false];

const ClassManagerTable = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState<Data[]>([]);
  const [is_active, setIs_active] = useState<boolean | null>(null);
  const [is_descending, setIs_descending] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchDataAndSetRows = async () => {
      const data = await fetchClasses(page + 1, rowsPerPage, is_active, is_descending, getCookieCustom('accessToken') as string);
      if (data.status === 201) {
        const classData = data.data.classesWithHostName;
        const totalCount = data.data.totalCount;
        setRows(classData);
        setTotalItems(totalCount);
        setIsLoading(false);
      }
    };
    fetchDataAndSetRows();
  }, [page, rowsPerPage, is_active, is_descending, isLoading]);

  const handleSort = (() => {
    setIs_descending(!is_descending);
    setPage(0);
  })

  const handleIsActive = () => {
    setIs_active(active_list[(active_list.indexOf(is_active) + 1) % 3]);
    setPage(0);
  }

  const handleClickRow = (classId: string) => {
    if (classId === '' || classId === undefined) return;
    router.push(`/class-detail/${classId}`)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '200px' }}>Class Name</TableCell>
              <TableCell style={{ width: '700px' }} align='left'>Description</TableCell>
              <TableCell align='center'>Host Name</TableCell>
              <TableCell align='center' onClick={handleIsActive} style={{ width: '100px' }}
                sx={{
                  "& > *": { borderBottom: "unset" },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    cursor: "pointer"
                  },
                }}>Is Active</TableCell>
              <TableCell align='right' onClick={handleSort} style={{ width: '200px' }}
                sx={{
                  "& > *": { borderBottom: "unset" },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    cursor: "pointer"
                  },
                }}>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 && rows.map(row => (
              <TableRow
                key={row._id as string}
                onClick={() => handleClickRow(row._id)}
                sx={{
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
                <TableCell component='th' scope='row' style={{ width: '200px' }}>
                  {row.className}
                </TableCell>
                <TableCell style={{ width: '700px' }} align='left'>{row.description}</TableCell>
                <TableCell align='center'>{row.host.fullname}</TableCell>
                <TableCell align='center' style={{ width: '100px' }}>{row.is_active.toString()}</TableCell>
                <TableCell align='right' style={{ width: '200px' }}>{row.createdAt}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component='div'
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper >
  );
}
export default ClassManagerTable;
