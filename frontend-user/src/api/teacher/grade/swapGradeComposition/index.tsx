export const fetchSwapIndex = async (class_id: string, source_index: number, destination_index: number, accessToken: string) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/teacher/gradeComposition/swapGradeCompositions/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                class_id: class_id,
                source_index: source_index,
                destination_index: destination_index
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