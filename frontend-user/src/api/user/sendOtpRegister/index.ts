const fetchSendOtpRegister = async (email: string) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/user/send_registerOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
        })
        const dataResponse = await response.json();

        if (response.status === 200) {
            return { status: 200, data: dataResponse }
        }
        else {
            return { status: 400, errorData: dataResponse }
        }
    }
    catch (error) {
        return { status: 500, error };
    }
}

export default fetchSendOtpRegister;