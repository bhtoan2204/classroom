export const fetchGradeReviews = async (accessToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/gradeReview/getGradeReviewList`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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