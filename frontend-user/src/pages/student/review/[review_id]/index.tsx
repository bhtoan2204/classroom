import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import CommentsBlock from "src/views/student/grade_review/CommentsBlock";


const MockData = 
{
    _id: "mockdata-01",
    class_id: "6592e0148058c601d6f46419",
    class_name: "Advanced Web Programming",
    description: "In this course, you will be able to study more detail about how to create a modern website",
    host: "6592df7c8058c601d6f46414",
    gradeCompo_name: "Midterm",
    current_grade: 7,
    expected_grade: 10,
    student_explain: "missing grade at the third question, sir",
    comments: [{ commenter: "Macle Mike M", text: "Sir" }, { commenter: "Phuong Le", text: "Oke, let me check it" }],
    finalDecision: { status: "Unknown", updatedGrade: null }
};


function ReviewDetailPage()
{
    const router = useRouter();
    const review_id = router.query.review_id;

    const [reviewDetail, setReviewDetail] = useState<any>({})

    useEffect(() =>
    {
        if(review_id === undefined)
        {

            return;
        }

        //load review detail herer

        //mock data
        setReviewDetail(MockData)

    }, [review_id])



    // const commentDisplay: any = (reviewDetail.comments && reviewDetail.comments.length > 0) ?
    //     reviewDetail.comments.map((value: any, index: number) =>
    //     {

    //         return(
    //             <>
    //                 <ListItem key={new String(index) + value.commenter}>
    //                     <Stack direction={"column"}>
    //                         <Typography fontWeight={500} component={"div"}>
    //                             {value.commenter}
    //                         </Typography>
    //                         <Typography fontSize={"small"}>
    //                             {value.text}
    //                         </Typography>
    //                     </Stack>
    //                 </ListItem>
    //             </>
    //         )
    //     }):
    //     <>
    //         <Box justifyContent={"center"}>
    //             <Typography>
    //                 No comment found
    //             </Typography>
    //         </Box>
    //     </>


    return(
        <>

            <Stack paddingX={2} width={"100%"}>
                <Typography variant="h4" component={"div"}>
                    Review {reviewDetail._id !== undefined ? reviewDetail._id: "Loading"}
                </Typography>
                <Box marginY={2}>
                    <Typography component={"div"}>
                        {reviewDetail.class_name !== undefined ? reviewDetail.class_name : "Loading"}
                    </Typography>
                    <Typography component={"div"} prefix="Grade composition">
                        {reviewDetail.gradeCompo_name !== undefined ? reviewDetail.gradeCompo_name : "Loading"}
                    </Typography>
                    <Stack direction={"row"} width={"50%"}>
                        <Typography component={"div"} marginRight={2}>
                            Reason: 
                        </Typography>
                        <Typography component={"div"} textOverflow={"clip"}>
                            {reviewDetail.student_explain !== undefined ? reviewDetail.student_explain : "Loading"}
                        </Typography>
                    </Stack>
                </Box>
                <Stack direction={"row"} width={"100%"} paddingY={3}>
                    <Stack width={"50%"} height={"100%"} alignItems={"center"} justifyContent={"center"}>
                        <Card sx={{borderWidth:2, width:"95%", marginBottom: 3}}>
                            <CardContent>
                                <Stack direction={"row"}>
                                    <Typography component={"div"} width={"30%"}>
                                        Current grade:
                                    </Typography>
                                    <Typography component={"div"}>
                                        {reviewDetail.current_grade !== undefined ? reviewDetail.current_grade : "Loading"}
                                    </Typography>
                                </Stack>
                                <Stack direction={"row"}>
                                    <Typography component={"div"} width={"30%"}>
                                        Expected grade: 
                                    </Typography>
                                    <Typography component={"div"}>
                                        {reviewDetail.expected_grade !== undefined ? reviewDetail.expected_grade : "Loading"}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card sx={{borderWidth:3, borderColor:"#094885", borderStyle:"solid" ,width:"95%"}}>
                            <CardContent>
                                <Stack direction={"row"}>
                                    <Typography component={"div"} width={"30%"}>
                                        Decision:
                                    </Typography>
                                    <Typography component={"div"}>
                                        {reviewDetail.finalDecision !== undefined ? reviewDetail.finalDecision.status : "Loading"}
                                    </Typography>
                                </Stack>
                                <Stack direction={"row"}>
                                    <Typography component={"div"} width={"30%"} fontWeight={"700"}>
                                        Updated grade: 
                                    </Typography>
                                    <Typography component={"div"}>
                                        {reviewDetail.finalDecision !== undefined ? reviewDetail.finalDecision.updated_grade : "Loading"}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                    <CommentsBlock ListOfComments={reviewDetail.comments} width={"50%"} maxHeight={"400px"} heightOfCommentView={"250px"}/>
                </Stack>
            </Stack>
        </>
    )
}

export default ReviewDetailPage