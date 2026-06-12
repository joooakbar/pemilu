import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, type JWTPayload } from "@/lib/auth";
import prisma from "@/lib/db";

/** Response helper — sukses */
export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

/** Response helper — error */
export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

/** Middleware auth guard untuk API routes */
export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest, payload: JWTPayload) => Promise<NextResponse>,
  roles?: string[],
): Promise<NextResponse> {
  const cookieName = process.env.COOKIE_NAME ?? "evotis_token";
  const token = req.cookies.get(cookieName)?.value;

  if (!token) return err("Unauthorized", 401);

  const payload = verifyJWT(token);
  if (!payload) return err("Token tidak valid atau kadaluarsa", 401);

  if (roles && !roles.includes(payload.role)) {
    return err("Akses ditolak — role tidak mencukupi", 403);
  }

  return handler(req, payload);
}

/** Simple in-memory rate limiter (ganti Redis di production) */
const rateLimitMap = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.reset) {
    rateLimitMap.set(key, { count: 1, reset: now + windowMs });
    return true; // allowed
  }

  if (record.count >= max) return false; // blocked

  record.count++;
  return true; // allowed
}

/** Catat aktivitas ke tabel activity_logs */
export async function logActivity(opts: {
  userId?: string;
  role?: string;
  action: string;
  entity?: string;
  entityId?: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    const data: any = {
      action: opts.action, // WAJIB (jangan hilang)
    };

    if (opts.userId) data.userId = opts.userId;
    if (opts.role) data.role = opts.role;
    if (opts.entity) data.entity = opts.entity;
    if (opts.entityId) data.entityId = opts.entityId;
    if (opts.ipAddress) data.ipAddress = opts.ipAddress;
    if (opts.metadata) data.metadata = opts.metadata;

    await prisma.logAktivitas.create({
      data,
    });
  } catch (e) {
    console.error("[logActivity] gagal catat log:", opts.action);
  }
}

/** Ambil IP address dari request */
export function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}
