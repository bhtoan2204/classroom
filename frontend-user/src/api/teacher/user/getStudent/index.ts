export const fetchListStudent = async (class_id: string, page: number, itemPerPage: number, accessToken: string) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/teacher/class/getStudents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                class_id: class_id,
                page: page,
                itemPerPage: itemPerPage
            })
        });
        if (response.ok) {
            const data = await response.json();

            return { status: 200, data: data };
        }

        else {
            const error = await response.json();

            return { status: 400, errorData: error };
        }
    }
    catch (error) {
        return {
            status: 500, errorData: { message: error }
        }
    }
}