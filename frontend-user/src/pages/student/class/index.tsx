'use client';

import { Grid } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GET_getStudentJoinedClasses } from "src/api/student/class/get_classes/api";
import ClassCard from "src/views/student/class/ClassCard";

const StudentRoute = () => {

    //  "classes": [
    // {
    //     "_id": "658bf5a063abdfb1dc18cc14",
    //     "className": "Physics II",
    //     "description": "This is a Physics II class",
    //     "id": "658bf5a063abdfb1dc18cc14"
    //   }
    // ],
    const [classes, setClasses] = useState<any>([])

    useEffect(() =>
    {
        async function fetchStudentJoinedClasses()
        {
            const {status, data} = await GET_getStudentJoinedClasses()

            if(status == 200)
            {
                setClasses(data.classes)
            }
            else
            {
                setClasses([])
            }
        }

        fetchStudentJoinedClasses()
    }, [])

    const displayedClasses = (classes.length > 0) ?
        classes.map((value: any, index: Number) =>
        {
            <Grid key={value._id} item lg={2} md={3} sm={6} xs={12}>
                <ClassCard ClassInfo={value}/>
            </Grid>
        }): 
        <>
            <div>
                No class has been joined yet
            </div>
        </>

    interface ClassInfo
    {_id: string, className: string, description: string, id: string}
    
    const MockClassInfo : ClassInfo = 
    {
        _id: "658bf5a063abdfb1dc18cc14",
        className: "Physics II",
        description: "This is a Physics II class",
        id: "658bf5a063abdfb1dc18cc14"
    }

    return (
        <div>
            <h1>Your class</h1>
            <Grid container spacing={3} columns={{sm: 2, md: 4, lg: 6, xs:1}}>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard ClassInfo={MockClassInfo}/>
                </Grid>

                {/* <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12}>
                    <ClassCard />
                </Grid> */}
                {displayedClasses}
            </Grid>

        </div>
    )
}

export default StudentRoute;