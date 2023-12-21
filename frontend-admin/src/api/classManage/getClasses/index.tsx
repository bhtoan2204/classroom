export const fetchClasses = async (page: number, itemPerPage: number,
    is_active: boolean | null, is_descending: boolean | null,
    accessToken: string) => {
    try {
        const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/admin/class/getClasses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify({
                page,
                itemPerPage,
                is_active,
                is_descending
            })
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();

            return { data, status: apiResponse.status };
        }
        else {
            const errorData = await apiResponse.json();

            return { message: errorData, status: apiResponse.status };
        }
    }
    catch (error) {
        return { error, status: 500 };
    }
}
