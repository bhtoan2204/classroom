export const fetchClassUrl = async (classId: string, accessToken: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/gradeComposition/getURL/${classId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const data = await res.json();

        if (res.ok) {
            return { status: 200, data: data };
        }
        else {
            return { status: res.status, data: data };
        }
    }
    catch (err) {
        return { status: 500, data: err }
    }
}