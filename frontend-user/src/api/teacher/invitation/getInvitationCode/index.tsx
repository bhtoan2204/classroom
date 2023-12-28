export const fetchInvitationCode = async (class_id: string, accessToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/invitation/code/${class_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return await response.json();
    }
    catch (error) {
        return { status: 500, message: 'Internal Server Error' }
    }
}