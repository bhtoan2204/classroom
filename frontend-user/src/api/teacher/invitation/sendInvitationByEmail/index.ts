export const fetchSendInvitationByEmail = async (accessToken: string, email: string, class_id: string, class_token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/invitation/inviteByEmail`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    email,
                    class_id,
                    class_token
                })
            },
        )

        if (response.ok) {

            return { status: 200, message: 'Success' }
        }
        else {

            return { status: 400, message: 'Fail' }
        }
    }

    catch (error) {
        return { status: 500, message: 'Internal Server Error' }
    }
}