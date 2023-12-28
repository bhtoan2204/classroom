export const fetchGradeBoard = async (class_id: string, accessToken: string) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/teacher/gradeManagement/showGradeOfStudent/${class_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        if (res.ok) {
            const data = await res.json();

            return { data, status: res.status };
        }
        else {
            const errorData = await res.json();

            return { message: errorData, status: res.status };
        }
    }
    catch (error) {
        return { error, status: 500 };
    }
}