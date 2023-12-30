const fetchClassDetailTeacher = async (class_id: string, accessToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/class/classDetail/${class_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (response.ok) {
            const data = await response.json();

            return data;
        }
    }
    catch (error) {

        return { status: 500, error }
    }
};

export default fetchClassDetailTeacher;