'use server';

import { getCookieCustom } from "src/utils/cookies";



export async function GET_getClassMembers(class_id)
{
    const path = `/student/class/viewClassMembers/${class_id}`
    const accessToken = getCookieCustom("accessToken")

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: 'GET',
            headers:
            {
                "Authorization" : "Bearer " + accessToken
            }
        })

        const status = response.status
        const data = await response.json()

        return {status, data}
    }
    catch(err)
    {
        return {status: 500, data: undefined}
    }
}

export async function GET_getTeachers(class_id)
{
    const path = `/student/class/viewClassTeachers/${class_id}`
    const accessToken = getCookieCustom("accessToken")

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: 'GET',
            headers:
            {
                "Authorization" : "Bearer " + accessToken
            }
        })

        const status = response.status
        const data = await response.json()
        return {status, data}
    }
    catch(err)
    {
        return {status: 500, data: undefined}
    }
}