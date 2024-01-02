export const fetchDownloadStudentList = async (class_id: string, accessToken: string): Promise<Blob> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/teacher/gradeManagement/downloadListStudentTemplate/${class_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const blobData = await response.blob();

    return blobData;
}