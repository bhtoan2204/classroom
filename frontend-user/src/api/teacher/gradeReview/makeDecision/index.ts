export const fetchMakeDecision = async (accessToken: string, gradeReview_id: string, status: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/gradeReview/markFinalGrade`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ gradeReview_id, status })
        });

        const data = await response.json();

        if (response.ok) {

            return { status: 201, data: data };
        }

        return { status: 400, message: data.message };
    }

    catch (error) {

        return { status: 500, message: error }
    }
}