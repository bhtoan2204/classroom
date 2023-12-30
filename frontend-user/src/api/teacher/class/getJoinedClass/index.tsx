export const fetchJoinedClass = async (page: number, itemPerPage: number, accessToken: string) => {
    try {
        const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/teacher/class/getMyClasses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify({
                page: page,
                itemPerPage: itemPerPage
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
    }
    catch (error) {
        return { error, status: 500 };
    }
}