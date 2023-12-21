import Cookies from 'js-cookie';

export const getCookieCustom = (name: string): string | null => {
    return Cookies.get(name) || null;
};

export const removeCookieCustom = (name: string): void => {
    Cookies.remove(name);
}

export const setCookieCustom = (name: string, value: string, days: number): void => {
    Cookies.set(name, value, { expires: days });
}
