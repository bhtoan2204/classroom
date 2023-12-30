const fetchRegister = async (email: string, fullname: string, password: string, birthday: string, otp: number) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, fullname, password, birthday: new Date(birthday), otp }),
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
};

export default fetchRegister;