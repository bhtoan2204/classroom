import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, IconButton, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react";
import { fetchGradeReviewDetail } from "src/api/teacher/gradeReview/getGradeReviewDetail";
import { getCookieCustom } from "src/utils/cookies";
import SendIcon from '@mui/icons-material/Send';
import { fetchPushComment } from "src/api/teacher/gradeReview/pushComment";
import { sendNotification } from "src/api/socket";
import { fetchMakeDecision } from "src/api/teacher/gradeReview/makeDecision";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

interface GradeReviewDetailData {
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
    student_explain: string;
    comments: {
        commenter: string;
        text: string;
    }[];
    finalDecision: {
        status: string;
        updatedGrade: number;
    };
    createdAt: string;
    updatedAt: string;
}

interface CommentData {
    commenter: string;
    text: string;
}

function ReviewDetailPage() {
    const router = useRouter();
    const review_id = router.query.review_id;

    const [reviewDetail, setReviewDetail] = useState<GradeReviewDetailData | null>(null);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [currentComment, setCurrentComment] = useState<any>("");
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");

    const fetchData = async () => {
        const accessToken = getCookieCustom("accessToken");
        const data = await fetchGradeReviewDetail(accessToken as string, review_id as string);
        if (data.status === 200) {
            setReviewDetail(data.data);
            setComments(data.data.comments);
        }
        else {
            setReviewDetail(null);
            setComments([]);
        }
    };

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };


    const handleComment = async () => {
        if (review_id === undefined) {
            return;
        }
        if (currentComment.length < 1) {
            return;
        }
        const accessToken = getCookieCustom("accessToken");
        const data = await fetchPushComment(accessToken as string, review_id as string, currentComment);

        if (data.status === 201) {
            fetchData();
            setCurrentComment("");
            if (reviewDetail !== null) {
                sendNotification({
                    receiver_id: reviewDetail?.student_id._id,
                    title: "New comment on your grade review" + reviewDetail.gradeCompo_name,
                    content: "You have a new comment on your grade review at " + reviewDetail.class_id.className,
                    id: review_id as string,
                });
            }
        }
    }

    const handleMakingDecision = async () => {
        if (review_id === undefined) {
            return;
        }
        const accessToken = getCookieCustom("accessToken");
        const data = await fetchMakeDecision(accessToken as string, review_id as string, status);

        console.log(data);

        if (data.status === 201) {
            if (reviewDetail !== null) {
                sendNotification({
                    receiver_id: reviewDetail?.student_id._id,
                    title: "Your grade review has been " + status,
                    content: "Your grade review at " + reviewDetail.class_id.className + " has been " + status,
                    id: review_id as string,
                });
            }
            router.push("/teacher/grade-review");
        }
    }

    const commentDisplay: any = (comments && comments.length > 0) ?
        comments.map((value: CommentData, index: number) => {
            return (
                <>
                    <ListItem key={index}>
                        <Stack direction={"column"}>
                            <Typography fontWeight={500} component={"div"}>
                                {value.commenter}
                            </Typography>
                            <Typography fontSize={"small"}>
                                {value.text}
                            </Typography>
                        </Stack>
                    </ListItem>
                </>
            )
        }) :
        <>
            <Box justifyContent={"center"}>
                <Typography>
                    No comment found
                </Typography>
            </Box>
        </>

    useEffect(() => {
        if (review_id !== undefined)
            fetchData();
    }, [review_id])

    return (
        <>
            <Stack paddingX={2} width={"100%"}>
                <Typography variant="h4" component={"div"}>
                    Review {reviewDetail !== null ? reviewDetail.class_id.className : "Loading"}
                </Typography>
                <Box marginY={2}>
                    <Typography component={"div"}>
                        Tên sinh viên: {reviewDetail !== null ? reviewDetail.student_id.fullname : "Loading"}
                    </Typography>
                    <Typography component={"div"} prefix="Grade composition">
                        Cột điểm: {reviewDetail !== null ? reviewDetail.gradeCompo_name : "Loading"}
                    </Typography>
                    <Stack direction={"row"} width={"50%"}>
                        <Typography component={"div"} marginRight={2}>
                            Reason:
                        </Typography>
                        <Typography component={"div"} textOverflow={"clip"}>
                            {reviewDetail !== null ? reviewDetail.student_explain : "Loading"}
                        </Typography>
                    </Stack>
                </Box>
                <Stack direction={"row"} width={"100%"} paddingY={3}>
                    <Stack width={"50%"} height={"100%"} alignItems={"center"} justifyContent={"center"}>
                        <Card sx={{ borderWidth: 2, width: "95%", marginBottom: 3 }}>
                            <CardContent>
                                <Stack direction={"row"}>
                                    <Typography component={"div"} width={"30%"}>
                                        Current grade:
                                    </Typography>
                                    <Typography component={"div"}>
                                        {reviewDetail !== null ? reviewDetail.current_grade : "Loading"}
                                    </Typography>
                                </Stack>
                                <Stack direction={"row"}>
                                    <Typography component={"div"} width={"30%"}>
                                        Expected grade:
                                    </Typography>
                                    <Typography component={"div"}>
                                        {reviewDetail !== null ? reviewDetail.expected_grade : "Loading"}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card sx={{ width: "95%", marginBottom: 3 }}>
                            <CardContent>
                                <Stack direction={"row"}>
                                    <Typography component={"div"} width={"30%"}>
                                        Decision:
                                    </Typography>
                                    <Typography color={reviewDetail?.finalDecision.status == "approved" ? "green" : "gray"}>
                                        <IconButton>
                                            {reviewDetail?.finalDecision.status == "approved" ? <CheckCircleOutlineIcon color={"success"} /> : <HourglassTopIcon />}
                                        </IconButton>
                                        {reviewDetail?.finalDecision.status}
                                    </Typography>
                                </Stack>
                                <Stack direction={"row"}>
                                    <Typography component={"div"} width={"30%"} fontWeight={"700"}>
                                        Updated grade:
                                    </Typography>
                                    <Typography component={"div"}>
                                        {reviewDetail !== null ? reviewDetail.finalDecision.updatedGrade : "Loading"}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        {reviewDetail !== null && reviewDetail.finalDecision.status === "PENDING" ? (
                            <Card sx={{ borderWidth: 3, borderColor: "#094885", borderStyle: "solid", width: "95%" }}>
                                <CardContent>
                                    <Stack direction={"row"} marginBottom={5}>
                                        <Typography component={"div"} width={"100%"}>
                                            Making Your Decision
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent="space-evenly" alignItems="center">
                                        <Button variant="contained" onClick={() => { openConfirmModal(); setStatus("approved") }}>Approve</Button>
                                        <Button variant="outlined" onClick={() => { openConfirmModal(); setStatus("rejected") }}>Reject</Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ) : (<> </>
                        )}
                    </Stack>
                    <Stack width="50%" maxHeight="400px">
                        <Card sx={{ width: "100%", height: "400px" }}>
                            <CardContent>
                                <Typography component={"div"}>
                                    Comments
                                </Typography>
                                <Divider />
                                <Box overflow={"auto"} maxHeight="400px" height="250px">
                                    <List>
                                        {commentDisplay}
                                    </List>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ maxHeight: "70px", height: "100%" }}>
                                <Box position={"relative"} width={"100%"} height={"100%"}>
                                    <form
                                        style={{ width: "100%", position: "absolute", bottom: 0 }}>
                                        <FormControl fullWidth={true}>
                                            <Stack direction={"row"}>
                                                <TextField
                                                    value={currentComment} onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setCurrentComment(event.target.value) }}
                                                    size="medium" sx={{ width: "100%" }} multiline={true} />
                                                <Button onClick={handleComment}>
                                                    <IconButton size="large" color={"primary"}>
                                                        <SendIcon />
                                                    </IconButton>
                                                </Button>
                                            </Stack>
                                        </FormControl>
                                    </form>
                                </Box>
                            </CardActions>
                        </Card>
                    </Stack>
                </Stack>
            </Stack>
            <Dialog open={isConfirmModalOpen} onClose={closeConfirmModal}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to {status === "Approved" ? "approved" : "rejected"} this review?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleMakingDecision} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ReviewDetailPage