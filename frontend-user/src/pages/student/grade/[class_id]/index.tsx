import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Card, CardContent, Stack, Tab } from "@mui/material";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { GET_getStudentGrade } from "src/api/student/grade/grade_management/api";
import { GET_getGradeReviews } from "src/api/student/grade/grade_review/api";
import { GET_getGradeStructure } from "src/api/student/grade/grade_structure/api";
import GradeManagement from "src/views/student/grade/GradeManagement";
import GradeReview from "src/views/student/grade/GradeReview";
import GradeStructure from "src/views/student/grade/GradeStructure";



function StudentGrade() {
    const router = useRouter()
    const class_id = router.query.class_id;

    const [tabValue, setTabValue] = useState("1")
    const [gradeCompositions, setGradeCompositions] = useState<any>([])
    const [gradeStructures, setGradeStructures] = useState<any>([])
    const [gradeReviews, setGradeReviews] = useState<any>([])

    //load student's grade compositions

    useEffect(() => {
        async function fetchGradeComposition() {
            if (class_id === undefined) {

                return
            }
            const { status, data } = await GET_getStudentGrade(class_id)
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

    }, [class_id])


    //load student's grade structure

    useEffect(() => {
        async function fetchGradeStructure() {
            if (class_id === undefined) {

                return;
            }

            const { status, data } = await GET_getGradeStructure(class_id);
            console.log(data);
            if (status == 200 && data) {
                const controlledData = data.map((value: any) => {
                    const item: any =
                    {
                        key: value._id,
                        nameOfGrade: value.gradeCompo_name,
                        gradeScale: value.gradeCompo_scale,
                        isFinalized: value.is_finalized,
                    }

                    return item;
                })
                setGradeStructures(controlledData)
            }
            else {
                setGradeStructures([])
            }
        }

        fetchGradeStructure()

    }, [class_id])


    //load student's grade reviews

    useEffect(() => {
        async function fetchGradeReviews() {
            const { status, data } = await GET_getGradeReviews()

            if (status == 200) {
                setGradeReviews(data)
            }
            else {
                setGradeReviews([])
            }
        }

        fetchGradeReviews()  

    }, [])



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
                            <GradeManagement ClassId={class_id} GradeCompositions={gradeCompositions}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <GradeStructure DataSource={gradeStructures}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <GradeReview GradeReviews={gradeReviews}/>
                        </TabPanel>
                    </TabContext>
                </CardContent>
            </Card>
        </>
    )
}

export default StudentGrade