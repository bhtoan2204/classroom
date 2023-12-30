export const fetchMarkRead = async (notificationId: string, accessToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/notification/${notificationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        }

        else {
            return data;
        }
    }

    catch (error) {
        throw error;
    }
}