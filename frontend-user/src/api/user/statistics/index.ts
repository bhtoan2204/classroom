export const fetchStatistics = async (accessToken: string) => {
    try {
        const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/user/getStatistics', {
            method: 'GET',
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
            const error = await apiResponse.json();

            return { error, status: apiResponse.status };
        }
    }
    catch (e) {
        return { status: 500, data: { message: 'Internal Server Error' } }
    }
}