export const fetchBanAccount = async (user_id: string, accessToken: string) => {
    try {
        const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/admin/accounts/banOrUnbanAccount/${user_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();

            return { data, status: apiResponse.status };
        }
        else {
            const errorData = await apiResponse.json();

            return { errorData, status: apiResponse.status };
        }
    }
    catch (error) {
        return { error, status: 500 };
    }
}
