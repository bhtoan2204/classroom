import { Box, Button, Card, CardActions, CardContent, Divider, FormControl, IconButton, List, ListItem, Stack, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GET_getGradeReviewComment, POST_sendComment } from "src/api/student/grade/grade_review/api";
import { SendNotification, sendNotification } from "src/api/socket";

function CommentsBlock({ ListOfComments, width, maxHeight, heightOfCommentView, ReviewId, ClassName, Host }: any) {

    const [comments, setComments] = useState<any>(ListOfComments);
    const [updateCommentFlat, setUpdateCommentFlat] = useState<any>(false)
    const [currentComment, setCurrentComment] = useState<any>("")

    useEffect(() => {
        setComments(ListOfComments)
    }, [ListOfComments])

    useEffect(() =>
    {
        async function fetchComments()
        {
            if(ReviewId === undefined)
            {

                return;
            }

            const {status, data} = await GET_getGradeReviewComment(ReviewId);
            if(status == 200)
            {
                setComments(data)
            }

            //else keep the current data
        }

        fetchComments()

    }, [updateCommentFlat, ReviewId])

    async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (ReviewId === undefined) 
        {

            return;
        }

        if (currentComment.length < 1) 
        {
            
            return;
        }

        const timeCommentSent = new Date(Date.now()).toUTCString()
        const { status, data } = await POST_sendComment(ReviewId, currentComment)

        if (status == 201) {
            const nextFlat = !updateCommentFlat
            setUpdateCommentFlat(nextFlat);

            const notiTitle = `Reply at Grade review ${data.gradeCompo_name} - class ${ClassName}`
            const notiContent = `${currentComment}\n(at ${timeCommentSent}`
            const notification: SendNotification =
            {
                receiver_id: Host,
                title: notiTitle,
                content: notiContent,
                id: data._id
            }

            sendNotification(notification)
        }

    }

    const commentDisplay: any = (comments && comments.length > 0) ?
        comments.map((value: any, index: number) => {

            return (
                <>
                    <ListItem key={new String(index) + value.commenter}>
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

    return (
        <>
            <Stack width={width} maxHeight={maxHeight}>
                <Card sx={{ width: "100%", height: maxHeight }}>
                    <CardContent>
                        <Typography component={"div"}>
                            Comments
                        </Typography>
                        <Divider />
                        <Box overflow={"auto"} maxHeight={heightOfCommentView} height={heightOfCommentView}>
                            <List>
                                {commentDisplay}
                            </List>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ maxHeight: "70px", height: "100%" }}>
                        <Box position={"relative"} width={"100%"} height={"100%"}>
                            <form onSubmit={(handleCommentSubmit)}
                                style={{ width: "100%", position: "absolute", bottom: 0 }}>
                                <FormControl fullWidth={true}>
                                    <Stack direction={"row"}>
                                        <TextField
                                            value={currentComment} onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setCurrentComment(event.target.value) }}
                                            size="medium" sx={{ width: "100%" }} multiline={true} />
                                        <Button type="submit">
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
        </>
    )
}

export default CommentsBlock