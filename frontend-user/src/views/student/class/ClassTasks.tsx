import { Box, Button, Card, CardContent, Collapse, Divider, Stack, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";



// const MockData = 
// [
//     {
//         _id: "mockdata-01",
//         gradeCompo_name: "Quiz 1",
//         url: "https://www.facebook.com/",
//         is_finalized: false,
//     },
//     {
//         _id: "mockdata-02",
//         gradeCompo_name: "Quiz 1",
//         url: "https://www.facebook.com/",
//         is_finalized: true,
//     },
//     {
//         _id: "mockdata-03",
//         gradeCompo_name: "Quiz 1",
//         url: "https://www.facebook.com/",
//         is_finalized: false,
//     }    
// ]


function ClassTasks({ListAssignments, height, maxHeight}: any) 
{
    const [collapseInfoOpen, setCollapseInfoOpen] = useState<any>([]);

    useEffect(() =>
    {
        if(ListAssignments === undefined || ListAssignments === null)
        {

            return;
        }
        else if(ListAssignments.length < 1)
        {

            return;
        }

        setCollapseInfoOpen(new Array(ListAssignments.length).fill(false));

    }, [ListAssignments])

    function handleCollapseButtonClick(event: MouseEvent, targetIndex: number)
    {   
        event.preventDefault();
        const copiedCollapseInfoOpen = collapseInfoOpen.slice();
        const nextState = !copiedCollapseInfoOpen[targetIndex]
        copiedCollapseInfoOpen[targetIndex] = nextState;
        setCollapseInfoOpen(copiedCollapseInfoOpen)
    }

    function handleAssignmentURLClick(event:any, targetUrl: string)
    {
        event.preventDefault();
        window.open(targetUrl)
    }   


    const assignmentDisplay = (ListAssignments !== undefined && ListAssignments !== null && ListAssignments.length > 0) ?
    ListAssignments.map((value: any, index: number) =>
    {
        const item = 
        <>
            <Card key={value._id}>
                <CardContent>
                    <Button sx={{width:"100%", display:"flex", justifyContent:"left"}}
                    onClick={(e:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {handleCollapseButtonClick(e, index)}}>
                        <Typography component={"div"} color={value.is_finalized? "green": "gray"}>
                            {value.gradeCompo_name}
                        </Typography>
                    </Button>
                    <Collapse
                        in={collapseInfoOpen[index]}
                        timeout={"auto"}
                        unmountOnExit
                        sx={{padding: 4}}
                    >
                        <Divider />
                        <Stack>
                            <Button fullWidth sx={{display:"flex", justifyContent:"left"}}
                                onClick={(e:MouseEvent) => {handleAssignmentURLClick(e, value.url)}}
                            >
                                <Typography fontSize={"small"} component={"div"} sx={{textOverflow:"clip", textDecoration:"underline"}} textAlign={"left"}>
                                    {value.url}
                                </Typography>
                            </Button>
                        </Stack>
                    </Collapse>
                </CardContent>
            </Card>
        </>

        return item;
    })
    :
    <>
        <Typography component={"div"} fontSize={"medium"} width={"100%"} textAlign={"center"}>
            No assignment found
        </Typography>
        <Divider />
    </>

    return (
        <>
            <Box width={"100%"} height={height} maxHeight={maxHeight} overflow={"auto"}>
                <Stack width={"100%"} direction={"column"} spacing={3}>
                    {assignmentDisplay}
                </Stack>
            </Box>
        </>
    )
}

export default ClassTasks