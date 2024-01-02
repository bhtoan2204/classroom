import { Box, Button, Grid, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_getStudentJoinedClasses } from "src/api/student/class/get_classes/api";
import ClassCard from "src/views/student/class/ClassCard";
import AddIcon from '@mui/icons-material/Add';
import JoinClassModal from "src/views/student/class/JoinClassModal";

const StudentRoute = () => {

    const [classes, setClasses] = useState<any>([])
    const [joinClassModalOpen, setJoinClassModalOpen] = useState<any>(false)

    useEffect(() => {
        async function fetchStudentJoinedClasses() {
            const { status, data } = await GET_getStudentJoinedClasses()

            if (status == 200) {
                setClasses(data.classes)
            }
            else {
                setClasses([])
            }

        }

        fetchStudentJoinedClasses()

    }, [])

    const displayedClasses: any = (classes.length > 0) ?
        classes.map((value: any) => {
            return (
                <Grid item key={value.class_id} lg={2} md={3} sm={6} xs={12}>
                    <ClassCard ClassInfo={value} />
                </Grid>
            )
        }) :
        <>
            <div>
                No class has been joined yet
            </div>
        </>

    // interface ClassInfo { _id: string, className: string, description: string, id: string }

    // const MockClassInfo: ClassInfo =
    // {
    //     _id: "658bf5a063abdfb1dc18cc14",
    //     className: "Physics II",
    //     description: "This is a Physics II class",
    //     id: "658bf5a063abdfb1dc18cc14"
    // }


    function handleJoinClassOpenModalClick() {
        setJoinClassModalOpen(true)
    }

    function handleJoinClassOpenModalCallback(value: any) {
        setJoinClassModalOpen(value)
    }

    return (
        <>
            <div>
                <Box>
                    <Stack direction={"row"}>
                        <Button size="medium" style={{ borderRadius: "50px" }} onClick={handleJoinClassOpenModalClick}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                            Join class
                        </Button>
                    </Stack>
                </Box>
                <h1>Your class</h1>
                <Grid container rowGap={3} columns={{ sm: 2, md: 4, lg: 6, xs: 1 }}>
                    {displayedClasses}
                </Grid>
            </div>

            <JoinClassModal OpenModal={joinClassModalOpen} handleOpenModalCallback={handleJoinClassOpenModalCallback} />
        </>

    )
}

export default StudentRoute;