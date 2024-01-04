import { Box, Button, Card, CardActions, CardContent, Divider, FormControl, IconButton, List, ListItem, Stack, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

function CommentsBlock({ListOfComments, width, maxHeight, heightOfCommentView}: any)
{
    const commentDisplay: any = (ListOfComments && ListOfComments.length > 0) ?
    ListOfComments.map((value: any, index: number) =>
    {

        return(
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
    }):
    <>
        <Box justifyContent={"center"}>
            <Typography>
                No comment found
            </Typography>
        </Box>
    </>

    return(
        <>
            <Stack width={width} maxHeight={maxHeight}>
                <Card sx={{width:"100%", height:maxHeight}}>
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
                    <CardActions sx={{maxHeight:"70px", height:"100%"}}>
                        <Box position={"relative"} width={"100%"} height={"100%"}>
                            <form style={{width: "100%" ,position:"absolute", bottom: 0}}>
                                <FormControl fullWidth={true}>
                                    <Stack direction={"row"}>
                                        <TextField size="medium" sx={{width: "100%"}} multiline={true}/>
                                        <Button>
                                            <IconButton size="large" color={"primary"}>
                                                <SendIcon/>
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