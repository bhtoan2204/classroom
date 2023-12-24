import Cookies from 'js-cookie';

export const getCookieCustom = (name: string): string | null => {
    return Cookies.get(name) || null;
};

export const removeCookieCustom = (name: string): void => {
    Cookies.remove(name);
}

export const setCookieCustom = (name: string, value: string, days: number): void => {
    if (Cookies) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        Cookies.set(name, value, { expires: expirationDate });
    } else {
        console.error('Error when use cookies');
    }
}
