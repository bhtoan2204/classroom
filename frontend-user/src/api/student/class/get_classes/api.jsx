import { getCookieCustom } from "src/utils/cookies";

export async function GET_getStudentJoinedClasses()
{
    const path = "/student/class/getJoinedClasses"
    let accessToken = getCookieCustom('accessToken')
    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: "GET",
            credentials: "same-origin",
            headers:
            {
                "Authorization": "Bearer "+  accessToken,
                "Content-Type": "application/json"
            }
        })

        const status = response.status
        
        let data = []
        if(response.headers.get('content-length') == 0)
        {
            data = []
        }
        else
        {
            data = await response.json()
        }
        
        return {status, data}
    }
    catch(err)
    {

        return {status: 500, data: undefined}
    }
}