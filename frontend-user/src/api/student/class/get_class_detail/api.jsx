import { getCookieCustom } from "src/utils/cookies";


export async function GET_getClassDetail(class_id)
{
    const path = `/student/class/getClassDetail/${class_id}`;
    const accessToken = getCookieCustom("accessToken");

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path;

        const response = await fetch(url, 
            {
                method: 'GET',
                headers:
                {
                    "Authorization": "Bearer " + accessToken
                }
            })

        const status = response.status;
        const data = await response.json()

        return {status, data}
    }
    catch(err)
    {

        return {status: 500, data: undefined}
    }
}

export async function GET_getStudentId(class_id)
{
    const path = `/student/class/getStudentId/${class_id}`;
    const accessToken = getCookieCustom("accessToken");

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path;

        const response = await fetch(url, 
            {
                method: 'GET',
                headers:
                {
                    "Authorization": "Bearer " + accessToken
                }
            })

        const status = response.status;
        const data = await response.json()

        return {status, data}
    }
    catch(err)
    {

        return {status: 500, data: undefined}
    }
}

export async function POST_mapStudentId(class_id, student_id)
{
    const path = "/student/class/mapStudentId"
    const accessToken = getCookieCustom('accessToken')

    const inputName_classId = "class_id";
    const inputName_studentId = "new_studentId"

    const map = new Map();
    map.set(inputName_classId, class_id);
    map.set(inputName_studentId, student_id)
    const requestBody = JSON.stringify(Object.fromEntries(map))

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path;
        const response = await fetch(url, {
            method: 'POST',
            body: requestBody,
            headers:
            {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json" 
            }
        })
        
        const status = response.status;
        const data = await response.json();

        return {status, data}
    }
    catch(err)
    {

        return {status: 500, data: undefined}
    }
}