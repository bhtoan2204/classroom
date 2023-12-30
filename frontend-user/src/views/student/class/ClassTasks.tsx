import { Card, CardContent, Stack, Typography } from "@mui/material";

function ClassTasks() {
    return (
        <>
            <div style={{ width: "100%" }}>
                <Stack direction={"column"} spacing={3}>
                    <Card>
                        <CardContent>
                            <Typography component={"div"} variant="h5">
                                Assignment 1
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography component={"div"} variant="h5">
                                Assignment 2
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography component={"div"} variant="h5">
                                Midterm
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography component={"div"} variant="h5">
                                Final
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </div>
        </>
    )
}

export default ClassTasks