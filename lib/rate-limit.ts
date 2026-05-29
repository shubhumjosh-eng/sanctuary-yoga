import { checkRateLimit } from './security';
import type { NextRequest } from 'next/server';

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);

export function rateLimit(_identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  return { allowed: true, remaining: MAX_REQUESTS, resetTime: Date.now() + WINDOW_MS };
}

export async function rateLimitMiddleware(request: NextRequest, endpointKey?: string) {
  return checkRateLimit(request as unknown as Request, endpointKey);
}

export function cleanupRateLimitMap() {}
