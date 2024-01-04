import { getCookieCustom } from "src/utils/cookies"


export async function POST_joinClassByCode(class_id)
{
    const path = `/student/class/joinClassByCode/${class_id}`
    const accessToken = getCookieCustom("accessToken")
    console.log(accessToken)
    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: 'POST',
            headers:
            {
                "Authorization": "Bearer " + accessToken
            }
        })

        const status = response.status;
        const data = await response.json();
        console.log(status)
        console.log(data)

        return {status, data}
    }
    catch(err)
    {

        return {status:500, data: undefined}
    }
}

export async function POST_joinClassByLink(class_id, class_token)
{
    const path = `/student/class/joinClassByCode/${class_id}/${class_token}`
    const accessToken = getCookieCustom("accessToken")

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: 'POST',
            headers:
            {
                "Authorization": "Bearer " + accessToken
            }
        })

        const status = response.status;
        const data = await response.json();
        console.log(status)
        console.log(data)

        return {status, data}
    }
    catch(err)
    {

        return {status:500, data: undefined}
    }
}