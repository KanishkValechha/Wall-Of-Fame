import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || "your-secret-key");

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  let token = req.nextUrl.searchParams.get("token"); // Get token from URL

  if (pathname === "/") {
    console.log("Homepage accessed. No authentication required.");
    return NextResponse.next();
  }

  const redirectToUnauthorized = (msg: string) => {
    const url = new URL("/unauth", req.url);
    url.searchParams.set("msg", msg);
    url.searchParams.set("redirect", new URL('/unauthorized',req.url).toString());
    console.log(`Redirecting to /unauthorized with message: ${msg}`);
    return NextResponse.redirect(url);
  };

  if (pathname === "/submit" || pathname === "/dashboard") {
    if (!token) {
      console.log("No token found. Redirecting to /unauthorized.");
      return redirectToUnauthorized("No token found.");
    }

    try {
      token = decodeURIComponent(token); // Decode in case it's URL-encoded
      const { payload } = await jwtVerify(token, SECRET_KEY);
      let email = String(payload.email || "").trim();

      if (!email.includes("@")) {
        console.log("Invalid email format in token. Redirecting to /unauthorized.");
        return redirectToUnauthorized("Invalid email format in token.");
      }

      const domain = email.split("@")[1];

      if (pathname === "/dashboard" && domain !== "jaipur.manipal.edu") {
        console.log("Unauthorized access attempt to dashboard. Redirecting.");
        return redirectToUnauthorized("Unauthorized access to dashboard.");
      }

      if (pathname === "/submit" && domain !== "muj.manipal.edu") {
        console.log("Unauthorized access attempt to submit page. Redirecting.");
        return redirectToUnauthorized("Unauthorized access to submit page.");
      }

      console.log(`Token Verified Successfully! Logged-in Email: ${email}`);
      console.log(`Extracted Domain: ${domain}`);

      return NextResponse.next(); // Allow access
    } catch (error) {
      console.log("Invalid Token! Redirecting to /unauthorized.", error);
      return redirectToUnauthorized("Invalid token.");
    }
  }

  if (pathname === "/admin") {
    if (!token) {
      console.log("No token found. Redirecting to /unauthorized.");
      return redirectToUnauthorized("No token found.");
    }

    try {
      token = decodeURIComponent(token); // Decode in case it's URL-encoded
      const { payload } = await jwtVerify(token, SECRET_KEY);
      let email = String(payload.email || "").trim();

      if (!email.includes("@")) {
        console.log("Invalid email format in token. Redirecting to /unauthorized.");
        return redirectToUnauthorized("Invalid email format in token.");
      }

      const user = email.split("@")[0];
      const domain = email.split("@")[1];

      if (domain !== "jaipur.manipal.edu" && domain !== "muj.manipal.edu") {
        console.log("Unauthorized access attempt to admin page. Redirecting.");
        return redirectToUnauthorized("Unauthorized access to admin page.");
      }

      const allowedUsers = ["vedic.229302083", "kanishk.229302193"];
      if (!allowedUsers.includes(user)) {
        console.log("Unauthorized access attempt to admin page. Redirecting.");
        return redirectToUnauthorized("User not authorized for admin access.");
      }

      console.log(`Token Verified Successfully! Logged-in Email: ${email}`);
      console.log(`Extracted Domain: ${domain}`);

      return NextResponse.next(); // Allow access
    } catch (error) {
      console.log("Invalid Token! Redirecting to /unauthorized.", error);
      return redirectToUnauthorized("Invalid token.");
    }
  }

  return NextResponse.next(); // Allow access to all other routes
}

export const config = {
  matcher: [
    "/((?!unauthorized|_next/static|_next/image|favicon.ico).*)", // Protect all pages, including domain-a-page and domain-b-page
  ],
};