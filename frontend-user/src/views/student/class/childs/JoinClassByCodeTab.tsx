import { Backdrop, Button, Card, CardActions, CardContent, FormControl, FormLabel, TextField, Typography } from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react"
import { POST_joinClassByCode } from "src/api/student/class/join_class/api"



function JoinClassByCodeTab()
{
    const classCodeInputKey = "class-code-input-key"
    const [classCode, setClassCode] = useState("")
    const [backdropOpen, setBackDropOpen] = useState(false)
    const [backdropDisplay, setBackdropDisplay] = useState(<></>)

    function handleClassCodeOnChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)
    {
        setClassCode(event.target.value)
    }

    function handleBackDropClose()
    {
        setBackDropOpen(false)
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault()
        const {status, data} = await POST_joinClassByCode(classCode)

        if(status == 201)
        {
            const display =                     
            <>
                <CardContent>
                    <Typography component={"div"} security="success">
                        Joined class {classCode} successfully!
                    </Typography>
                    <Typography component={"div"} >
                        Do you want to visit the new class?
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">
                        No, I will stay
                    </Button>
                    <Button size="small" href={`/student/class/${classCode}`}>
                        Yes, visit now!
                    </Button>
                </CardActions>
            </>

            setBackdropDisplay(display)
        }
        else
        {
            const display = 
            <CardContent>
                <Typography component={"div"} security="error">
                    Joined class {classCode} failed!
                </Typography>
                <Typography component={"div"} >
                    Please review your class code
                </Typography>
            </CardContent>

            setBackdropDisplay(display)
        }

        setBackDropOpen(true)
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true} sx={{marginY: 4}}>
                        <FormLabel sx={{marginY:2}}>Class code</FormLabel>
                        <TextField autoFocus size="medium" style={{width: "100%"}} key={classCodeInputKey} value={classCode} type="text" onChange={handleClassCodeOnChange}/>
                </FormControl>
                <Button type="submit" fullWidth={true} size="medium" sx={{paddingY:3}}>Join now</Button>
            </form>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdropOpen}
            onClick={handleBackDropClose}
            >
                <Card>
                    {backdropDisplay}
                </Card>
            </Backdrop>  
        </>
    )

}

export default JoinClassByCodeTab