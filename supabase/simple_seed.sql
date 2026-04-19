-- Clear existing data and insert fresh sample data

DELETE FROM class_schedules;
DELETE FROM classes;
DELETE FROM instructors;

-- Insert instructors
INSERT INTO instructors (name, email, phone, bio, specialties, hourly_rate) VALUES
('Maya Johnson', 'maya@sanctuaryyoga.com', '555-0101', 'Certified RYT-500 with 8 years experience in Vinyasa and Hatha yoga.', ARRAY['Vinyasa', 'Hatha'], 45.00),
('Daniel Chen', 'daniel@sanctuaryyoga.com', '555-0102', 'Specializing in power yoga and mindfulness meditation.', ARRAY['Power Yoga', 'Meditation'], 50.00),
('Priya Patel', 'priya@sanctuaryyoga.com', '555-0103', 'Expert in Yin yoga and restorative practices for healing.', ARRAY['Yin', 'Restorative'], 40.00);

-- Insert classes
INSERT INTO classes (instructor_id, title, description, yoga_style, level, duration_minutes, capacity, price) VALUES
((SELECT id FROM instructors WHERE name = 'Maya Johnson'), 'Morning Flow', 'Start your day with energizing vinyasa flow', 'Vinyasa', 'All Levels', 60, 12, 25.00),
((SELECT id FROM instructors WHERE name = 'Maya Johnson'), 'Hatha Basics', 'Foundational hatha yoga for beginners', 'Hatha', 'Beginner', 75, 15, 20.00),
((SELECT id FROM instructors WHERE name = 'Daniel Chen'), 'Power Hour', 'High-intensity power yoga session', 'Power Yoga', 'Intermediate', 60, 10, 30.00),
((SELECT id FROM instructors WHERE name = 'Daniel Chen'), 'Mindful Lunch', 'Mid-day meditation and gentle movement', 'Meditation', 'All Levels', 45, 20, 20.00),
((SELECT id FROM instructors WHERE name = 'Priya Patel'), 'Deep Stretch', 'Restorative yin yoga for deep release', 'Yin', 'All Levels', 75, 12, 25.00),
((SELECT id FROM instructors WHERE name = 'Priya Patel'), 'Evening Restore', 'Wind down with gentle restorative poses', 'Restorative', 'All Levels', 60, 15, 22.00);

-- Insert class schedules
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

-- Show what we have
SELECT c.title, cs.day_of_week, cs.start_time, cs.location 
FROM classes c 
JOIN class_schedules cs ON cs.class_id = c.id
ORDER BY cs.day_of_week, cs.start_time;