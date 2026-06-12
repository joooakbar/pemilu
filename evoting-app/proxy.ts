import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/* ================= CONFIG ================= */

const PUBLIC_PATHS = ["/admin/login"];

const ROLE_ACCESS = {
  ADMIN: [
    "/admin/saksi",
    "/admin/emergency",
    "/admin/berita-acara",
    "/admin/kandidat",
  ],
  PANITIA: ["/admin/dpt"],
};

/* ================= HELPERS ================= */

const isBypass = (path: string) =>
  path.startsWith("/api") ||
  path.startsWith("/_next") ||
  path.startsWith("/studio") ||
  path.includes(".");

const isAdmin = (path: string) => path.startsWith("/admin");

const isPublic = (path: string) => PUBLIC_PATHS.includes(path);

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET ?? "dev-secret",
    );

    const { payload } = await jwtVerify(token, secret);

    return payload as {
      sub: string;
      role: "ADMIN" | "PANITIA" | "SAKSI";
      name: string;
    };
  } catch {
    return null;
  }
}

function hasAccess(path: string, role: string) {
  // ADMIN only
  if (ROLE_ACCESS.ADMIN.some((p) => path.startsWith(p))) {
    return role === "ADMIN";
  }

  // ADMIN + PANITIA
  if (ROLE_ACCESS.PANITIA.some((p) => path.startsWith(p))) {
    return role === "ADMIN" || role === "PANITIA";
  }

  return true;
}

/* ================= MIDDLEWARE ================= */

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* 1. Bypass static & api */
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  /* 2. Non-admin → allow */
  if (!isAdmin(pathname)) {
    return NextResponse.next();
  }

  /* 3. Public admin page */
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  /* 4. Ambil token */
  const cookieName = process.env.COOKIE_NAME ?? "evotis_token";
  const token = req.cookies.get(cookieName)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  /* 5. Verify JWT */
  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  /* 6. RBAC check */
  if (!hasAccess(pathname, user.role)) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  /* 7. Inject header (optional, untuk server component) */
  const res = NextResponse.next();

  res.headers.set("x-user-id", user.sub);
  res.headers.set("x-user-role", user.role);
  res.headers.set("x-user-name", user.name);

  return res;
}

/* ================= MATCHER ================= */

export const config = {
  matcher: ["/admin/:path*"],
};
