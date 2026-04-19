-- Check what's in tables
SELECT 'instructors' as t, count(*) as cnt FROM instructors
UNION ALL
SELECT 'classes', count(*) FROM classes
UNION ALL
SELECT 'class_schedules', count(*) FROM class_schedules;

-- If schedules are empty, insert them
INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 1, '07:00', '08:00', 'Studio A'
FROM classes c WHERE c.title = 'Morning Flow'
AND NOT EXISTS (SELECT 1 FROM class_schedules WHERE class_id = c.id);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 3, '07:00', '08:00', 'Studio A'
FROM classes c WHERE c.title = 'Morning Flow'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id AND cs.day_of_week = 3);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 5, '07:00', '08:00', 'Studio A'
FROM classes c WHERE c.title = 'Morning Flow'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id AND cs.day_of_week = 5);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 2, '18:00', '19:15', 'Studio B'
FROM classes c WHERE c.title = 'Hatha Basics'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 4, '18:00', '19:15', 'Studio B'
FROM classes c WHERE c.title = 'Hatha Basics'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 1, '17:30', '18:30', 'Studio A'
FROM classes c WHERE c.title = 'Power Hour'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 3, '17:30', '18:30', 'Studio A'
FROM classes c WHERE c.title = 'Power Hour'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id AND cs.day_of_week = 3);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 2, '12:00', '12:45', 'Meditation Room'
FROM classes c WHERE c.title = 'Mindful Lunch'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 4, '12:00', '12:45', 'Meditation Room'
FROM classes c WHERE c.title = 'Mindful Lunch'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id AND cs.day_of_week = 4);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 2, '19:30', '20:45', 'Studio B'
FROM classes c WHERE c.title = 'Deep Stretch'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id);

INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time, location)
SELECT c.id, 5, '19:00', '20:00', 'Studio B'
FROM classes c WHERE c.title = 'Evening Restore'
AND NOT EXISTS (SELECT 1 FROM class_schedules cs WHERE cs.class_id = c.id);

-- Show what we have now
SELECT cs.*, c.title as class_title 
FROM class_schedules cs 
JOIN classes c ON c.id = cs.class_id
ORDER BY cs.day_of_week, cs.start_time;