const PBKDF2_ITERATIONS = 600000;
const SALT_LENGTH = 32;
const KEY_LENGTH = 256;

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

export function generateSalt(): string {
  const bytes = new Uint8Array(SALT_LENGTH);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: encoder.encode(salt), iterations: PBKDF2_ITERATIONS, hash: 'SHA-512' },
    keyMaterial, KEY_LENGTH
  );
  return bytesToHex(new Uint8Array(derivedBits));
}

export async function verifyPassword(password: string, salt: string, hash: string): Promise<boolean> {
  const computedHash = await hashPassword(password, salt);
  if (computedHash.length !== hash.length) return false;
  const computed = new Uint8Array(computedHash.match(/.{2}/g)!.map(b => parseInt(b, 16)));
  const stored = new Uint8Array(hash.match(/.{2}/g)!.map(b => parseInt(b, 16)));
  if (computed.length !== stored.length) return false;
  let match = 0;
  for (let i = 0; i < computed.length; i++) {
    match |= computed[i] ^ stored[i];
  }
  return match === 0;
}

export async function createToken(payload: Record<string, unknown>): Promise<string> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('NEXTAUTH_SECRET not configured');
  const encoder = new TextEncoder();
  const data = JSON.stringify({ ...payload, iat: Date.now() });
  const cryptoKey = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
  const sigHex = bytesToHex(new Uint8Array(sig));
  return `${Buffer.from(data).toString('base64url')}.${sigHex}`;
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return null;
  try {
    const encoder = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const expectedSig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(parts[0]));
    const expectedHex = bytesToHex(new Uint8Array(expectedSig));
    if (expectedHex !== parts[1]) return null;
    const decoded = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf-8'));
    const TTL = 24 * 60 * 60 * 1000;
    if (Date.now() - (decoded.iat as number) > TTL) return null;
    return decoded as Record<string, unknown>;
  } catch {
    return null;
  }
}
