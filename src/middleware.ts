import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  try {
    const refreshToken = request.cookies.get('refreshToken');
    const { pathname, search, origin, basePath } = request.nextUrl;
    const signinPage = request.nextUrl.pathname.startsWith('/signin');
    const signupPage = request.nextUrl.pathname.startsWith('/signup');

    if (signupPage || signinPage) {
      if (refreshToken) {
        const signInUrl = new URL(`${basePath}/home`, origin);
        return NextResponse.redirect(signInUrl);
      }
      return NextResponse.next();
    }

    if (!refreshToken) {
      const signInUrl = new URL(`${basePath}/signin`, origin);
      signInUrl.searchParams.append(
        'callbackUrl',
        `${basePath}${pathname}${search}`,
      );
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
};

export const config = {
  matcher: ['/mypage', '/write', '/editprofile/:path*'],
};
