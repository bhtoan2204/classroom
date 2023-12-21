export const fetchGetUserPerPage = async (page: number, rowsPerPage: number, accessToken: string) => {
    try {
        const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/admin/accounts/getUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify({
                page: page,
                rowsPerPage: rowsPerPage
            })
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();

            return data;
        }
        else {
            const errorData = await apiResponse.json();

            return errorData;
        }
    }
    catch (error) {
        console.error('Error during refresh:', error);

        return;
    }
}
