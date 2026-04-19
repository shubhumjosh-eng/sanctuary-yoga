-- Fix missing columns in classes table
ALTER TABLE classes ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Fix missing columns in class_schedules table  
ALTER TABLE class_schedules ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add missing class_date column to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS class_date DATE;

-- Verify the tables
SELECT 'classes' as table_name, count(*) as rows FROM classes;
SELECT 'class_schedules' as table_name, count(*) as rows FROM class_schedules;
SELECT 'instructors' as table_name, count(*) as rows FROM instructors;
SELECT 'bookings' as table_name, count(*) as rows FROM bookings;