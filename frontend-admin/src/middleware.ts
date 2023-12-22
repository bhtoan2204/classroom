import { NextResponse, type NextRequest } from 'next/server';
import { fetchRefresh } from './api/auth/refresh';


export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken');
    const refreshToken = request.cookies.get('refreshToken');
    const baseURL = request.nextUrl.pathname;
    const url = request.nextUrl.clone();

    if (baseURL === '/pages/login/' && accessToken !== undefined && refreshToken !== undefined) {
        url.pathname = '/';

        return NextResponse.redirect(url);
    }
    if (baseURL !== '/pages/login/' && accessToken === undefined && refreshToken === undefined) {
        url.pathname = '/pages/login/';

        return NextResponse.redirect(url);
    }

    if (accessToken === undefined && refreshToken !== undefined) {
        const response = await fetchRefresh(refreshToken);
        if (response.status === 200) {
            const setCookieHeaders = [
                `accessToken=${response.data.accessToken}; Max-Age=${1 * 24 * 60 * 60}; Path=/;`,
                `refreshToken=${response.data.refreshToken}; Max-Age=${3 * 24 * 60 * 60}; Path=/;`,
            ];

            return NextResponse.next({
                headers: {
                    'Set-Cookie': setCookieHeaders as any,
                },
            });
        } else {
            url.pathname = '/pages/login/'
            const setCookieHeaders = [
                `refreshToken=; Max-Age=${0}; Path=/;`,
            ];

            return NextResponse.redirect(url, {
                headers: {
                    'Set-Cookie': setCookieHeaders as any,
                },
            });
        }
    }
}

export const config = {
    matcher: [
        '/page/login',
        '/',
        '/((?!api|static|.*\\..*|_next).*)'
    ],
};
