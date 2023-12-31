// ** MUI Imports
import * as React from 'react';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'


interface RowType {
  subject: string
  dateStart: string
  dateEnd: string
  designation: string
}


const rows: RowType[] = [
  {
    dateStart: '09/27/2023',
    subject: 'Data Structure and Algorithms',
    dateEnd: '12/27/2023',
    designation: '20CLC01'
  },
  {
    dateStart: '09/27/2023',
    dateEnd: '11/27/2023',
    subject: 'OOP',
    designation: '20CLC10'
  },
  {
    dateStart: '09/27/2023',
    subject: 'Advanced Database',
    dateEnd: '10/31/2023',
    designation: '20HTTT1'
  },
  {
    dateStart: '09/20/2023',
    dateEnd: '12/20/2023',
    subject: 'Data Science',
    designation: '20KHDL2'
  },
  {
    dateStart: '09/13/2023',
    dateEnd: '01/01/2024',
    subject: 'Software Architect',
    designation: '20KTPM1',
  },
  {
    dateStart: '09/25/2023',
    dateEnd: '12/28/2023',
    subject: 'Software Testing',
    designation: '20KTPM2'
  },
  {
    dateStart: '09/11/2023',
    dateEnd: '04/01/2023',
    subject: 'Advanced Web Programming',
    designation: '20KTPM2'
  },
  {
    dateStart: '09/10/2023',
    dateEnd: '10/1/2023',
    subject: 'Web Programming',
    designation: '20KTPM1',
  }
]


const rowsPerPage = 5;
const rowsPerPageOptions = [5];

const DashboardTable = () => {

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell >Date Start</TableCell>
              <TableCell>Date End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row: RowType)  => (
              <TableRow hover key={row.subject} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.subject}</Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.dateStart}</TableCell>
                <TableCell>{row.dateEnd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Card>
  )
}

export default DashboardTable
