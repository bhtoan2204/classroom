export const fetchMarkGrade = async (class_id: string, gradeCompo_name: string, accessToken: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/gradeManagement/markGradeAsFinal/${class_id}/${gradeCompo_name}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
}