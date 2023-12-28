import { Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_getClassMembers, GET_getTeachers } from "src/api/student/class/get_member/api";


function ClassSupportedFeature({ ClassId }: any) {
    const [memberDialogOpen, setMemberDialogOpen] = useState<any>(false)
    const [teachers, setTeachers] = useState<any>([])
    const [students, setStudents] = useState<any>([])


    // [
    //     {
    //       "_id": "658bc428e13d3096dae6a30c",
    //       "email": "lhphuong20@clc.fitus.edu.vn",
    //       "fullname": "",
    //       "id": "658bc428e13d3096dae6a30c"
    //     }
    // ]

    useEffect(() => {
        async function fetchTeachers() {
            const { status, data } = await GET_getTeachers(ClassId)
            if (status == 200) {
                setTeachers(data)
            }
            else {
                setTeachers([])
            }
        }

        fetchTeachers()
    }, [ClassId])

    useEffect(() => {
        async function fetchStudents() {
            const { status, data } = await GET_getClassMembers(ClassId)

            if (status == 200) {
                setStudents(data)
            }
            else {
                setStudents([])
            }
        }

        fetchStudents()
    }, [ClassId])

    function handleMemberDialogOnClose() {
        setMemberDialogOpen(false)
    }

    function handleOpenMemberDialog() {
        setMemberDialogOpen(true)
    }

    // [
    //     {
    //       "_id": "658bc428e13d3096dae6a30c",
    //       "email": "lhphuong20@clc.fitus.edu.vn",
    //       "fullname": "",
    //       "id": "658bc428e13d3096dae6a30c"
    //     }
    // ]
    const teachersOfTheClass = teachers.length > 0 ?
        teachers.map((teacher: any) => {
            return (
                <>
                    <ListItem disableGutters key={teacher._id}>
                        <ListItemButton style={{ display: "flex", justifyContent: "left", flexDirection: "column", alignItems: "start" }}>
                            <ListItemText primary={teacher.fullname ? teacher.fullname : "Teacher Name"} />
                            <ListItemText primary={teacher.email} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </>
            )
        }) :
        <ListItem>
            <ListItemText primary="No member found" />
        </ListItem>

    const studentOfTheClass = students.length > 0 ?
        students.map((student: any) => {
            <>
                <ListItem disableGutters key={student._id}>
                    <ListItemButton style={{ display: "flex", justifyContent: "left", flexDirection: "column", alignItems: "start" }}>
                        <ListItemText primary={student.fullname ? student.fullname : "Student Name"} />
                        <ListItemText primary={student.email} />
                    </ListItemButton>
                </ListItem>
                <Divider />
            </>
        }) :
        <ListItem>
            <ListItemText primary="No member found" />
        </ListItem>

    return (
        <div style={{ position: "sticky", zIndex: 10, overflowY: 'auto', width: "30%", minWidth: "150px" }}>
            <Stack spacing={2} height={'100%'}>
                <Card style={{ width: 250, maxWidth: 250 }}>
                    <CardContent>
                        <Typography component={"div"}>
                            Grade
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button key={'view grade button'} href={`/student/class/${ClassId}/grade`}>Go detail</Button>
                    </CardActions>
                </Card>
                <Card style={{ width: 250, maxWidth: 250 }}>
                    <CardContent>
                        <Typography component={"div"}>
                            Members
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button key={'view member button'} onClick={handleOpenMemberDialog}>Go detail</Button>
                    </CardActions>
                </Card>
            </Stack>

            <Dialog
                open={memberDialogOpen}
                onClose={handleMemberDialogOnClose}
                fullWidth={true}
            >
                <DialogTitle>
                    Members
                </DialogTitle>
                <DialogContent>
                    <Typography component={"div"}>Teacher</Typography>
                    <List>
                        {teachersOfTheClass}
                    </List>
                    <Typography component={"div"}>Student</Typography>
                    <List>
                        {studentOfTheClass}
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ClassSupportedFeature