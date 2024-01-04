import { getCookieCustom } from "src/utils/cookies"


export async function POST_requestGradeReview(mapRequest)
{
    const requestBody = JSON.stringify(Object.fromEntries(mapRequest))
    const path = "/student/gradeViewer/requestReview"
    const accessToken = getCookieCustom("accessToken")

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: 'POST',
            body: requestBody,
            headers:
            {
                "Content-Type": "application/json",
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