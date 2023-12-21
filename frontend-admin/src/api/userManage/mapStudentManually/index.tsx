export const mapStudentManually = async (class_id: string, user_id: string, student_id: string, accessToken: string) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/admin/class/manualMapStudentId`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                class_id,
                user_id,
                student_id
            })
        })
        if (res.ok) {

            return { status: res.status };
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