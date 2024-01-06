import { Avatar, Collapse, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { getCookieCustom } from "src/utils/cookies";
import { fetchGradeReviews } from "src/api/teacher/gradeReview/getGradeReview";


const classroomImages: any =
    [
        "https://img.freepik.com/free-photo/copy-space-surrounded-by-office-supplies_23-2148475345.jpg?w=1060&t=st=1703740272~exp=1703740872~hmac=648b46c0f7db09ab7d86a1495450db9abbad537f5a2c8612870b81bd36de0781",
        "https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149464866.jpg?w=1060&t=st=1703740313~exp=1703740913~hmac=dc4752bfefc66421f58e14e046ecbac39bdd9e88e1ae9b4aa4795ec96e935bd2",
        "https://img.freepik.com/free-vector/hand-drawn-colorful-science-education-wallpaper_23-2148489183.jpg?w=1060&t=st=1703740330~exp=1703740930~hmac=b315b1f005caf61155643b1d5d4ba9b80d96a5990fa69c9b1d227eeeab27cf4b",
        "https://img.freepik.com/free-vector/empty-school-class-background-video-conferencing_23-2148686345.jpg?w=1060&t=st=1703740387~exp=1703740987~hmac=eba14577638167df62801986654da0139e71ad5efa9033f2d30479a12bd8b6dc",
        "https://img.freepik.com/free-vector/interior-classroom_1308-26552.jpg?w=900&t=st=1703740419~exp=1703741019~hmac=4429dca33aab7a65a0e8cee9ff6d46859f359a329a51dd0c8f8abbfc3405b68a",
        "https://img.freepik.com/free-vector/teaching-concept-illustration_114360-2666.jpg?w=740&t=st=1703740458~exp=1703741058~hmac=87a169eb5dfdad3850a9e9e43db31a22dd297f4381e9b6ac9a97bc9a25a65c5b",
    ]

interface GradeReviewData {
    _id: string;
    class_id: {
        _id: string;
        className: string;
    };
    student_id: {
        _id: string;
        fullname: string;
    };
    gradeCompo_name: string;
    current_grade: number;
    expected_grade: number;
    finalDecision: {
        status: string;
        updatedGrade: number;
    }
}


const StudentRoute = () => {

    const [gradeReviews, setGradeReviews] = useState<GradeReviewData[]>([]);
    const [collapseOpenProps, setCollapseOpenProps] = useState<any>(new Array(gradeReviews.length).fill(false));

    function handleListItemClick(event: MouseEvent, valueIndex: any) {
        event.target
        const copiedCollapseOpenProps = collapseOpenProps.slice()
        const currentState = copiedCollapseOpenProps[valueIndex]
        copiedCollapseOpenProps[valueIndex] = !currentState;
        setCollapseOpenProps(copiedCollapseOpenProps)
    }

    const fetchData = async () => {
        const accessToken = getCookieCustom("accessToken");
        const data = await fetchGradeReviews(accessToken as string);
        if (data.status === 200) {
            setGradeReviews(data.data);
        }
    };

    useEffect(() => {
        fetchData();
    });

    const displayedClasses: any = (gradeReviews.length > 0) ?
        gradeReviews.map((value: any, index: any) => {
            return (
                <>
                    <ListItem key={value.class_id}>
                        <Stack width={"100%"}>
                            <Stack direction={"row"}>
                                <ListItemButton sx={{ width: "100%" }} onClick={(e) => { handleListItemClick(e, index) }}>
                                    <ListItemAvatar>
                                        <Avatar alt={`Class ${value.class_name}`} src={classroomImages[index % 6]} />
                                    </ListItemAvatar>
                                    <ListItemText primary={value.class_id.className} secondary={value.class_description} />
                                </ListItemButton>
                                <ListItemButton href={`/teacher/grade-review/${value._id}`}>
                                    <IconButton size="large">
                                        <ReadMoreIcon />
                                    </IconButton>
                                </ListItemButton>
                            </Stack>
                            <Divider />
                            <Collapse
                                in={collapseOpenProps[index]} timeout={"auto"} unmountOnExit sx={{ paddingX: 4 }}>
                                <Stack
                                    paddingY={3}
                                    paddingX={5}
                                    sx={{ borderColor: "#094885", borderWidth: 2, borderStyle: "solid", borderRadius: "10px" }}>
                                    <Stack direction={"row"}>
                                        <Typography component={"div"} fontSize={"large"}>
                                            Grade review -
                                        </Typography>
                                        <Typography sx={{ textDecoration: "underline", marginLeft: 1 }} fontSize={"large"}>
                                            {value.gradeCompo_name}
                                        </Typography>
                                    </Stack>
                                    <Stack sx={{ paddingX: 4, paddingY: 2 }}>
                                        <Stack direction={"row"} alignItems={"center"}>
                                            <Typography>
                                                Final decision:
                                            </Typography>
                                            <Typography color={value.finalDecision.status == "approved" ? "green" : "gray"}>
                                                <IconButton>
                                                    {value.finalDecision.status == "approved" ? <CheckCircleOutlineIcon color={"success"} /> : <HourglassTopIcon />}
                                                </IconButton>
                                                {value.finalDecision.status}
                                            </Typography>
                                        </Stack>
                                        <Stack direction={"row"} alignItems={"center"} paddingY={1}>
                                            <Typography>
                                                Current grade:
                                            </Typography>
                                            <Typography marginLeft={2}>
                                                {value.current_grade}
                                            </Typography>
                                        </Stack>
                                        <Stack direction={"row"} alignItems={"center"} paddingY={1}>
                                            <Typography>
                                                Expected Grade:
                                            </Typography>
                                            <Typography marginLeft={2}>
                                                {value.expected_grade}
                                            </Typography>
                                        </Stack>
                                        <Stack direction={"row"} alignItems={"center"} paddingY={1}>
                                            <Typography>
                                                Student Name:
                                            </Typography>
                                            <Typography marginLeft={2}>
                                                {value.student_id.fullname}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Collapse>
                        </Stack>
                    </ListItem>
                </>
            )
        }) :
        <>
            <div>
                No class has been joined yet
            </div>
        </>

    return (
        <div>
            <h1>Grade review</h1>
            <Paper>
                <List sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 660,
                    borderRadius: "10px"
                }}>
                    {displayedClasses}
                </List>
            </Paper>
        </div>
    )

}

export default StudentRoute;                