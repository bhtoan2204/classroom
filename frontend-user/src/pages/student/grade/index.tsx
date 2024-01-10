import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_getStudentJoinedClasses } from "src/api/student/class/get_classes/api";


const classroomImages: any =
    [
        "https://img.freepik.com/free-photo/copy-space-surrounded-by-office-supplies_23-2148475345.jpg?w=1060&t=st=1703740272~exp=1703740872~hmac=648b46c0f7db09ab7d86a1495450db9abbad537f5a2c8612870b81bd36de0781",
        "https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149464866.jpg?w=1060&t=st=1703740313~exp=1703740913~hmac=dc4752bfefc66421f58e14e046ecbac39bdd9e88e1ae9b4aa4795ec96e935bd2",
        "https://img.freepik.com/free-vector/hand-drawn-colorful-science-education-wallpaper_23-2148489183.jpg?w=1060&t=st=1703740330~exp=1703740930~hmac=b315b1f005caf61155643b1d5d4ba9b80d96a5990fa69c9b1d227eeeab27cf4b",
        "https://img.freepik.com/free-vector/empty-school-class-background-video-conferencing_23-2148686345.jpg?w=1060&t=st=1703740387~exp=1703740987~hmac=eba14577638167df62801986654da0139e71ad5efa9033f2d30479a12bd8b6dc",
        "https://img.freepik.com/free-vector/interior-classroom_1308-26552.jpg?w=900&t=st=1703740419~exp=1703741019~hmac=4429dca33aab7a65a0e8cee9ff6d46859f359a329a51dd0c8f8abbfc3405b68a",
        "https://img.freepik.com/free-vector/teaching-concept-illustration_114360-2666.jpg?w=740&t=st=1703740458~exp=1703741058~hmac=87a169eb5dfdad3850a9e9e43db31a22dd297f4381e9b6ac9a97bc9a25a65c5b",
    ]

const StudentRoute = () => {

    //  "classes": [
    // {
    //     "class_id": "658bf5a063abdfb1dc18cc14",
    //     "class_name": "Physics II",
    //     "class_description": "This is a Physics II class",
    //     "id": "658bf5a063abdfb1dc18cc14"
    //   }
    // ],

    const [classes, setClasses] = useState<any>([]);

    // const [displayedClasses, setDisplayedClasses] = useState(<></>)

    useEffect(() => {
        async function fetchStudentJoinedClasses() {
            const { status, data } = await GET_getStudentJoinedClasses()

            if (status == 200) {
                setClasses(data.classes)
            }
            else {
                setClasses([])
            }
        }

        fetchStudentJoinedClasses()

    }, [])

    function getRandomImage() {
        const randomNum = Math.round(Math.random() * 100) + classroomImages.length;

        return classroomImages[randomNum % classroomImages.length]
    }

    const displayedClasses: any = (classes.length > 0) ?
        classes.map((value: any) => {
            return (
                <ListItem key={value.class_id}>
                    <ListItemButton href={`/student/grade/${value.class_id}`}>
                        <ListItemAvatar>
                            <Avatar alt={`Class ${value.class_name}`} src={getRandomImage()} />
                        </ListItemAvatar>
                        <ListItemText primary={value.class_name} secondary={value.class_description} />
                    </ListItemButton>
                </ListItem>
            )
        }) :
        <>
            <div>
                No class has been joined yet
            </div>
        </>

    return (
        <div>
            <h1>Your grade</h1>
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