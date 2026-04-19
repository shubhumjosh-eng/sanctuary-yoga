-- Sanctuary Yoga Studio - Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Instructors table
CREATE TABLE instructors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    bio TEXT,
    specialties TEXT[], -- Array of yoga styles
    avatar_url TEXT,
    hourly_rate DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instructor_id UUID REFERENCES instructors(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    yoga_style TEXT, -- Vinyasa, Hatha, Yin, etc.
    level TEXT DEFAULT 'All Levels', -- Beginner, Intermediate, Advanced
    duration_minutes INTEGER DEFAULT 60,
    capacity INTEGER DEFAULT 15,
    price DECIMAL(10,2) DEFAULT 25.00,
    is_recurring BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class schedules - specific times classes are held
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    day_of_week INTEGER, -- 0=Sunday, 1=Monday, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location TEXT,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Instructor availability - when instructors can teach
CREATE TABLE instructor_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instructor_id UUID REFERENCES instructors(id) ON DELETE CASCADE,
    day_of_week INTEGER,
    start_time TIME,
    end_time TIME,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_schedule_id UUID REFERENCES class_schedules(id) ON DELETE SET NULL,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    student_phone TEXT,
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    notes TEXT,
    payment_status TEXT DEFAULT 'unpaid', -- unpaid, paid, refunded
    amount_paid DECIMAL(10,2),
    booked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_classes_instructor ON classes(instructor_id);
CREATE INDEX idx_class_schedules_class ON class_schedules(class_id);
CREATE INDEX idx_bookings_schedule ON bookings(class_schedule_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(student_email);

-- Insert sample instructors
INSERT INTO instructors (name, email, phone, bio, specialties, hourly_rate) VALUES
('Maya Johnson', 'maya@sanctuaryyoga.com', '555-0101', 'Certified RYT-500 with 8 years experience in Vinyasa and Hatha yoga.', ARRAY['Vinyasa', 'Hatha'], 45.00),
('Daniel Chen', 'daniel@sanctuaryyoga.com', '555-0102', 'Specializing in power yoga and mindfulness meditation.', ARRAY['Power Yoga', 'Meditation'], 50.00),
('Priya Patel', 'priya@sanctuaryyoga.com', '555-0103', 'Expert in Yin yoga and restorative practices for healing.', ARRAY['Yin', 'Restorative'], 40.00);

-- Insert sample classes
INSERT INTO classes (instructor_id, title, description, yoga_style, level, duration_minutes, capacity, price) VALUES
((SELECT id FROM instructors WHERE name = 'Maya Johnson'), 'Morning Flow', 'Start your day with energizing vinyasa flow', 'Vinyasa', 'All Levels', 60, 12, 25.00),
((SELECT id FROM instructors WHERE name = 'Maya Johnson'), 'Hatha Basics', 'Foundational hatha yoga for beginners', 'Hatha', 'Beginner', 75, 15, 20.00),
((SELECT id FROM instructors WHERE name = 'Daniel Chen'), 'Power Hour', 'High-intensity power yoga session', 'Power Yoga', 'Intermediate', 60, 10, 30.00),
((SELECT id FROM instructors WHERE name = 'Daniel Chen'), 'Mindful Lunch', 'Mid-day meditation and gentle movement', 'Meditation', 'All Levels', 45, 20, 20.00),
((SELECT id FROM instructors WHERE name = 'Priya Patel'), 'Deep Stretch', 'Restorative yin yoga for deep release', 'Yin', 'All Levels', 75, 12, 25.00),
((SELECT id FROM instructors WHERE name = 'Priya Patel'), 'Evening Restore', 'Wind down with gentle restorative poses', 'Restorative', 'All Levels', 60, 15, 22.00);

-- Insert sample class schedules
INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location) VALUES
((SELECT id FROM classes WHERE title = 'Morning Flow'), 1, '07:00', '08:00', 'Studio A'),
((SELECT id FROM classes WHERE title = 'Morning Flow'), 3, '07:00', '08:00', 'Studio A'),
((SELECT id FROM classes WHERE title = 'Morning Flow'), 5, '07:00', '08:00', 'Studio A'),
((SELECT id FROM classes WHERE title = 'Hatha Basics'), 2, '18:00', '19:15', 'Studio B'),
((SELECT id FROM classes WHERE title = 'Hatha Basics'), 4, '18:00', '19:15', 'Studio B'),
((SELECT id FROM classes WHERE title = 'Power Hour'), 1, '17:30', '18:30', 'Studio A'),
((SELECT id FROM classes WHERE title = 'Power Hour'), 3, '17:30', '18:30', 'Studio A'),
((SELECT id FROM classes WHERE title = 'Mindful Lunch'), 2, '12:00', '12:45', 'Meditation Room'),
((SELECT id FROM classes WHERE title = 'Mindful Lunch'), 4, '12:00', '12:45', 'Meditation Room'),
((SELECT id FROM classes WHERE title = 'Deep Stretch'), 2, '19:30', '20:45', 'Studio B'),
((SELECT id FROM classes WHERE title = 'Evening Restore'), 5, '19:00', '20:00', 'Studio B');