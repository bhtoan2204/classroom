export const fetchInputGrade = async (
    user_id: string,
    class_id: string,
    gradeCompo_name: string,
    input_grade: number,
    accessToken: string,
) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/gradeManagement/inputGradeForStudentAtSpecificAssignment`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            user_id,
            class_id,
            gradeCompo_name,
            input_grade,
        })
    })

}