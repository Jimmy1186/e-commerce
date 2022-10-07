import { NextRequest, NextResponse } from 'next/server'

// export const config = {
//     matcher: '/api/auth/signin',
//   }
  export const config = { matcher: ["/api/auth/signin","/admin"] }

  
export function middleware(req: NextRequest) {
    
    const basicAuth = req.headers.get('authorization')

   const url = req.nextUrl.clone()
  
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1] as string
      const [user, pwd] = atob(authValue).split(':')
     
      if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASSWORD) {
        return NextResponse.next()
      }
    }
    url.pathname = '/api/secret'
  
    return NextResponse.rewrite(url)
  }