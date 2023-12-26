export const fetchChangePassword = async (
    old_password: string, password: string,
    rewrite_password: string, accessToken: string) => {
    try {

        const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/user/change_password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify({
                old_password,
                password,
                rewrite_password
            })
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();

            return { data, status: apiResponse.status };
        }
        else {
            const errorData = await apiResponse.json();

            return { errorData, status: apiResponse.status };
        }
    } catch (error) {
        return { error, status: 500 };
    }
}