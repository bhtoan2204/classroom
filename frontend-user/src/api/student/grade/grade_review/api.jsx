import { getCookieCustom } from "src/utils/cookies"


export async function POST_requestGradeReview(mapRequest)
{
    const JsObject = Object.fromEntries(mapRequest)
    JsObject.expected_grade = Number.parseInt(JsObject.expected_grade)
    const requestBody = JSON.stringify(JsObject)
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

export async function GET_getGradeReviews()
{
    const path = "/student/gradeViewer/getGradeReviews"
    const accessToken = getCookieCustom("accessToken")

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: 'GET',
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

export async function GET_getGradeReviewDetail(reviewId)
{
    const path = `/student/gradeViewer/viewGradeReview/${reviewId}`
    const accessToken = getCookieCustom("accessToken")

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: "GET",
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

export async function POST_sendComment(reviewId, comment)
{
    const path = "/student/gradeViewer/postAComment"
    const accessToken = getCookieCustom("accessToken")
    const gradeReview_id = "gradeReview_id"
    const content = "content"

    const map = new Map();
    map.set(gradeReview_id, reviewId)
    map.set(content, comment)

    const requestBody = JSON.stringify(Object.fromEntries(map))

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: "POST",
            body: requestBody,
            headers:
            {
                "Authorization": "Bearer "+ accessToken,
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

export async function GET_getGradeReviewComment(reviewId)
{
    const path = `/student/gradeViewer/getGradeReviewComments/${reviewId}`
    const accessToken = getCookieCustom("accessToken")

    try
    {
        const url = process.env.NEXT_PUBLIC_API_HOST + path
        const response = await fetch(url, {
            method: "GET",
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