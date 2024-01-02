export const fetchGradeStructure = async (class_id: string, accessToken: string) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/teacher/gradeComposition/getCurentGradeStructure/${class_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
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