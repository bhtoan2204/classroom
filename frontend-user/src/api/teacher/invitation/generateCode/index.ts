export const fetchGenerateCode = async (class_id: string, accessToken: string) => {
    try {
        const respose = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/invitation/${class_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return respose.json();
    }
    catch (error) {
        return { status: 500, message: 'Internal Server Error' }
    }
}