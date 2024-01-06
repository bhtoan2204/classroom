import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { Box, Button, Card, CardContent, Dialog, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { POST_requestGradeReview } from 'src/api/student/grade/grade_review/api';

// import { SendNotification, sendNotification } from 'src/api/socket';

function GradeManagement({ ClassId, GradeCompositions }: any) {

    const [AskToReviewDialogOpen, setAskToReviewDialogOpen] = useState<any>(false)

    //ask-to-review dialog properties
    const [askToReview_gradeCompositionName, setAskToReview_gradeCompositionName] = useState<any>("")
    const [askToReview_expectedGrade, setAskToReview_expectedGrade] = useState<any>("")
    const [askToReview_explaination, setAskToReview_explaination] = useState<any>("")
    const [dialogMessageProp, setDialogMessageProp] = useState<any>({ display: 'none', color: "green", text: "nothing" })

    const formInputName_classId = "class_id"
    const formInputName_gradeCompositionName = "gradeCompo_name"
    const formInputName_expectedGrade = "expected_grade"
    const formInputName_explaination = "explaination"


    function handleAskToReviewGradeClick(event: MouseEvent, gradeComposition: any) {
        event.target
        setAskToReview_gradeCompositionName(gradeComposition.name)
        setAskToReviewDialogOpen(true)
    }

    function handleAskToReviewDialogClose() {
        setAskToReview_expectedGrade("")
        setAskToReview_explaination("")
        setAskToReviewDialogOpen(false)
    }

    async function handleRequestReviewSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (ClassId === undefined) {
            return;
        }

        if (askToReview_gradeCompositionName == "") {
            const copiedDialogMessageProp = { display: 'block', color: "red", text: "Please provide the composition's name" }
            setDialogMessageProp(copiedDialogMessageProp)

            return;
        }
        else if (askToReview_expectedGrade == "") {
            const copiedDialogMessageProp = { display: 'block', color: "red", text: "Please provide the expected grade" }
            setDialogMessageProp(copiedDialogMessageProp)

            return;
        }
        else if (askToReview_explaination == "") {
            const copiedDialogMessageProp = { display: 'block', color: "red", text: "Please provide the explaination" }
            setDialogMessageProp(copiedDialogMessageProp)

            return;
        }

        const request = new Map()
        request.set(formInputName_classId, ClassId)
        request.set(formInputName_gradeCompositionName, askToReview_gradeCompositionName)
        request.set(formInputName_expectedGrade, askToReview_expectedGrade)
        request.set(formInputName_explaination, askToReview_explaination)

        const { status, data } = await POST_requestGradeReview(request)
        if (status == 201) {
            const copiedDialogMessageProp = { display: 'block', color: "green", text: "Send request successfully!" }
            setDialogMessageProp(copiedDialogMessageProp)
            console.log(data);

            // const notification: SendNotification = 
            // {
            //     receiver: "",
            //     title: "",
            //     content: "",
            //     id: ""
            // }
            // sendNotification(notification)
        }
        else {
            const copiedDialogMessageProp = { display: 'block', color: "red", text: "Send request failed. Please try again" }
            setDialogMessageProp(copiedDialogMessageProp)

        }

        setTimeout(() => {
            const copiedDialogMessageProp = { display: 'none', color: "green", text: "nothing" }
            setDialogMessageProp(copiedDialogMessageProp)
        }, 3000)

        return;
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Grade composition name</TableCell>
                            <TableCell align="right">Scale</TableCell>
                            <TableCell align="right">Current grade</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {GradeCompositions.map((row: any) => (
                            <TableRow
                                key={row.key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.scale}</TableCell>
                                <TableCell align="right">{row.current_grade}</TableCell>
                                <TableCell align="right">
                                    {
                                        (row.key == "separator-row" || row.key == "summary-row") ?
                                            null :
                                            <Tooltip title={`Ask to review ${row.name}`}>
                                                <Button size='small' style={{ borderRadius: '50%' }} onClick={(event) => { handleAskToReviewGradeClick(event, row) }}>
                                                    <IconButton>
                                                        <ContactSupportIcon />
                                                    </IconButton>
                                                </Button>
                                            </Tooltip>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={AskToReviewDialogOpen}
                title="Review"
                onClose={handleAskToReviewDialogClose}
                fullWidth
            >
                <Card>
                    <CardContent>
                        <Typography component={"div"} fontWeight={600} variant='h5'>
                            Request review
                        </Typography>
                        <Box paddingY={6} paddingX={5}>
                            <form onSubmit={handleRequestReviewSubmit}>
                                <FormControl fullWidth>
                                    <FormLabel
                                        sx={{ marginY: 1 }}
                                        htmlFor='request-review-grade-composition-name'>Grade composition</FormLabel>
                                    <TextField placeholder='provide the name of grade composition'
                                        sx={{ marginY: 2 }}
                                        key={"request-review-grade-composition-name"} value={askToReview_gradeCompositionName} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setAskToReview_gradeCompositionName(e.target.value) }} />
                                    <FormLabel
                                        sx={{ marginY: 1 }}
                                        htmlFor="request-review-expected-grade">Expected Grade</FormLabel>
                                    <TextField placeholder='your expected grade'
                                        sx={{ marginY: 2 }}
                                        key={"request-review-expected-grade"} value={askToReview_expectedGrade} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setAskToReview_expectedGrade(e.target.value) }} />
                                    <FormLabel
                                        sx={{ marginY: 1 }}
                                        htmlFor='request-review-explaination'>Explaination</FormLabel>
                                    <TextField placeholder='your explaination'
                                        sx={{ marginY: 2 }}
                                        key={"request-review-explaination"} multiline={true} value={askToReview_explaination} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setAskToReview_explaination(e.target.value) }} />

                                    <Typography display={dialogMessageProp.display} component={"div"} color={dialogMessageProp.color}>
                                        {dialogMessageProp.text}
                                    </Typography>
                                    <Button
                                        type='submit'
                                        sx={{ marginTop: 4 }}
                                    >
                                        Send
                                    </Button>
                                </FormControl>
                            </form>
                        </Box>
                    </CardContent>
                </Card>
            </Dialog>
        </>
    )
}

export default GradeManagement