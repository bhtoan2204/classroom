export const fetchResetpassword = async (email: string, otp: number, newPassword: string, confirmPassword: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/user/reset_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        otp: Number(otp),
        password: newPassword,
        rewrite_password: confirmPassword
      })
    });
    const data = await response.json();

    if (response.ok) {
      return { data, status: response.status };
    } else {
      return { error: data.message || 'Unknown error', status: response.status };
    }
  } catch (error) {
    return { error: 'Network error', status: 500 };
  }
}
