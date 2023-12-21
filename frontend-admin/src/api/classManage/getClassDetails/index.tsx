export const fetchClassDetail = async (class_id: string, accessToken: string) => {
    const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/admin/class/getClassDetail/${class_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
    });
    if (apiResponse.ok) {
        const data = await apiResponse.json();

        return data;
    }
    else {
        const errorData = await apiResponse.json();

        return errorData;
    }
};