export const fetchPushComment = async (accessToken: string, grade_review_id: string, comment: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/gradeReview/conmmentGradeReview`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ grade_review_id, comment })
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