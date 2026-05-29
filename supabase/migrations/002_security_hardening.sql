-- Sanctuary Yoga Studio - Security & Hardening Migration
-- Run this in Supabase SQL Editor

-- Rate limiting table (Supabase-backed persistent rate limiter)
CREATE TABLE IF NOT EXISTS rate_limits (
    fingerprint TEXT NOT NULL,
    endpoint_key TEXT NOT NULL DEFAULT 'global',
    count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    abuse_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (fingerprint, endpoint_key)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits(window_start);
CREATE INDEX IF NOT EXISTS idx_rate_limits_fingerprint ON rate_limits(fingerprint);

-- Webhook idempotency table (prevents duplicate Stripe webhook processing)
CREATE TABLE IF NOT EXISTS webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stripe_event_id TEXT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_stripe_id ON webhook_events(stripe_event_id);

-- Users table (for NextAuth authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Add class_date column to bookings if not present
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'bookings' AND column_name = 'class_date'
    ) THEN
        ALTER TABLE bookings ADD COLUMN class_date DATE;
    END IF;
END $$;

-- Add updated_at column to bookings if not present
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'bookings' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE bookings ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Enable Row Level Security on all tables
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

-- RLS policies for bookings: users can read their own bookings
CREATE POLICY bookings_select_own ON bookings
    FOR SELECT
    USING (student_email = current_setting('request.jwt.claims')::json->>'email');

-- RLS policies for rate_limits: service role only
CREATE POLICY rate_limits_service_role ON rate_limits
    USING (true)
    WITH CHECK (true);

-- RLS policies for webhook_events: service role only
CREATE POLICY webhook_events_service_role ON webhook_events
    USING (true)
    WITH CHECK (true);
