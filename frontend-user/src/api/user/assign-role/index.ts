const fetchAssignRole = async (accessToken: string, role: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/user/assign-role`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ role })
        })
        const data = await response.json();

        return { status: response.status, data }
    }
    catch (error) {
        return { status: 500, error }
    }
}

export default fetchAssignRole;