export const fetchLogin = async (email: string, password: string) => {
    try {
        console.log(process.env.NEXT_PUBLIC_API_HOST + '/auth/localAdmin/login');
        const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/auth/localAdmin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (response.ok) {
            const data = await response.json();

            return { data, status: response.status };
        }
        else {
            const errorData = await response.json();

            return { errorData, status: response.status };
        }
    } catch (error) {
        return { error, status: 500 };
    }
}