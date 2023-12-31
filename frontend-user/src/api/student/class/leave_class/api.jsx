import { getCookieCustom } from "src/utils/cookies"


export async function DELETE_leaveClass(class_id)
{
    const path = `/student/class/leaveClass/${class_id}`
    const accessToken = getCookieCustom("accessToken")
    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: 'DELETE',
            headers:
            {
                "Authorization": "Bearer " + accessToken
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