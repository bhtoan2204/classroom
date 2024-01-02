import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Card, CardContent, Stack, Tab } from "@mui/material";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import GradeManagement from "src/views/student/grade/GradeManagement";
import GradeStructure from "src/views/student/grade/GradeStructure";



function StudentGrade() {
    const router = useRouter()
    const class_id = router.query.class_id;

    const [tabValue, setTabValue] = useState("1")


    function handleTabOnChange(event: SyntheticEvent, newValue: string) {
        event.currentTarget;
        setTabValue(newValue)
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Box marginY={4}>
                        <Stack direction={"row"}>
                            <Button href={`/student/class/${class_id}`}>
                                Go to class
                            </Button>
                        </Stack>
                    </Box>
                    <TabContext value={tabValue}>
                        <TabList
                            onChange={handleTabOnChange}
                        >
                            <Tab label="Grade management" value={"1"} />
                            <Tab label="Grade structure" value={"2"} />
                            <Tab label="Grade review" value={"3"} />
                        </TabList>
                        <TabPanel value="1">
                            <GradeManagement ClassId={class_id}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <GradeStructure ClassId={class_id} />
                        </TabPanel>
                        <TabPanel value="3">
                            Grade review
                        </TabPanel>
                    </TabContext>
                </CardContent>
            </Card>
        </>
    )
}

export default StudentGrade