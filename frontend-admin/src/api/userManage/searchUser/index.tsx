export const fetchSearchUserPerPage = async (text: string, page: number, perPage: number, accessToken: string) => {
    try {
        const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/admin/accounts/elasticSearchAccounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify({
                text: text,
                page: page,
                perPage: perPage
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
        return error
    }
}
