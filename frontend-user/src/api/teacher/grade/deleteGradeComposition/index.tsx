export const fetchDeleteGradeComposition = async (class_id: string, gradeComposition_name: string, accessToken: string) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/teacher/gradeComposition/removeGradeCompositions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                class_id: class_id,
                name: gradeComposition_name
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