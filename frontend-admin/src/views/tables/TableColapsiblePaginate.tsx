import { ChangeEvent, Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { fetchGetUserPerPage } from "src/api/userManage/getUserPerPage";
import { getCookieCustom } from "../../utils/cookies";
import { fetchSearchUserPerPage } from "src/api/userManage/searchUser";

interface RowType {
    id: string,
    fullname: string,
    email: string,
    role: string,
    login_type: string,
    avatar: string,
    is_ban: boolean,
    classes: Class[]
}

type Class = {
    class_id: string;
    class_name: string;
    class_description: string;
}

function createData(
    id: string,
    fullname: string,
    email: string,
    role: string,
    login_type: string,
    avatar: string,
    is_ban: boolean,
    classes: Class[]
) {
    return {
        id,
        fullname,
        email,
        role,
        login_type,
        avatar,
        is_ban,
        classes
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const pushRows = () => {
        const userId = row.id;
        if (userId === '') return;
        router.push(`/user-detail/${userId}`)
    }

    return (
        <Fragment>
            <TableRow
                sx={{
                    "& > *": { borderBottom: "unset" },
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        cursor: "pointer"
                    },
                }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row" onClick={pushRows}>
                    <img src={row.avatar} alt="avatar" width="50px" height="50px" />
                </TableCell>
                <TableCell component="th" scope="row" onClick={pushRows}>
                    {row.fullname}
                </TableCell>
                <TableCell align="right" onClick={pushRows}>{row.email}</TableCell>
                <TableCell align="center" onClick={pushRows}>{row.role}</TableCell>
                <TableCell align="center" onClick={pushRows}>{row.login_type}</TableCell>
                <TableCell align="center" onClick={pushRows}>{row.is_ban.toString()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Joined Classes
                            </Typography>
                            <Table size="medium" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Class Name</TableCell>
                                        <TableCell>Class Description</TableCell>
                                        <TableCell align="center">Is Active</TableCell>
                                        <TableCell align="right">Class ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.classes.map((clazz) => (
                                        <TableRow key={clazz.class_id}>
                                            <TableCell component="th" scope="row">
                                                {clazz.class_name}
                                            </TableCell>
                                            <TableCell>{clazz.class_description}</TableCell>
                                            <TableCell align="center">True</TableCell>
                                            <TableCell align="right">
                                                {clazz.class_id.toString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function TableColapsiblePaginate() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<RowType[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const currentRows = rows.filter((r, ind) => {
        return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = async () => {
        if (searchValue === '') {
            const data = await fetchGetUserPerPage(page + 1, rowsPerPage, getCookieCustom('accessToken') as string);
            setRows(data);
        }
        else {
            const data = await fetchSearchUserPerPage(searchValue, page + 1, rowsPerPage, getCookieCustom('accessToken') as string);
            setRows(data);
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await fetchGetUserPerPage(page + 1, rowsPerPage, getCookieCustom('accessToken') as string);
            if (data) {
                const arrData = data;
                setRows(arrData);
            }
        }
        fetchUserData()
    }, [page, rowsPerPage])

    return (
        <TableContainer component={Paper}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ margin: 4 }}>
                    <Typography variant="h6">List of Users</Typography>
                </Box>
                <Box sx={{ margin: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <TextField
                        id="search-bar"
                        className="text"
                        label="Enter fullname or email"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                        <Search style={{ fill: "blue" }} />
                    </IconButton>
                </Box>
            </Box>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Avatar</TableCell>
                        <TableCell>Fullname</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Login type</TableCell>
                        <TableCell align="center">Is ban</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentRows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
