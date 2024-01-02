export const fetchDownloadAssignment = async (class_id: string, gradeCompo_name: string, accessToken: string): Promise<Blob> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + `/teacher/gradeManagement/downloadTemplateByAssignment/${class_id}/${gradeCompo_name}`, {
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