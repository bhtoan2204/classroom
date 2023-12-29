export const fetchMarkRead = async (notificationId: string, accessToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/notification/${notificationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        }

        throw new Error(data.message);
    }

    catch (error) {
        throw error;
    }
}