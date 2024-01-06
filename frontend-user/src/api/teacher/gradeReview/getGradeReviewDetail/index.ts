export const fetchGradeReviewDetail = async (accessToken: string, grade_review_id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/gradeReview/getGradeReviewDetail/${grade_review_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (response.ok) {

            return { status: 200, data: data };
        }

        return { status: 400, message: data.message };
    }
    catch (error) {

        return { status: 500, message: error }
    }
}