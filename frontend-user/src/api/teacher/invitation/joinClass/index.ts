export const fetchJoinClass = async (class_id: string, code: string, accessToken: string) => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/invitation/joinClassByLink/${code}/${class_id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
    }
    catch (error) {
        return { status: 500, message: 'Internal Server Error' }
    }
}