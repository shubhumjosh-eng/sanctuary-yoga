import { z } from 'zod';

export const bookingSchema = z.object({
  class_schedule_id: z.string().uuid('Invalid class schedule ID format'),
  class_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  student_name: z.string().min(1, 'Name is required').max(100, 'Name too long').regex(/^[a-zA-Z\s\-'.]+$/, 'Name contains invalid characters'),
  student_email: z.string().email('Invalid email address'),
  student_phone: z.string().optional().nullable(),
  notes: z.string().max(500, 'Notes too long').optional().nullable(),
});

export const classSchema = z.object({
  instructor_id: z.string().uuid('Invalid instructor ID format'),
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional().nullable(),
  yoga_style: z.string().min(1, 'Yoga style is required').max(50, 'Yoga style too long'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'all'], { message: 'Invalid level' }).default('all'),
  duration_minutes: z.number().int().positive('Duration must be positive').max(300, 'Duration too long'),
  capacity: z.number().int().positive('Capacity must be positive').max(100, 'Capacity too large'),
  price: z.number().positive('Price must be positive').max(1000, 'Price too high'),
  is_recurring: z.boolean().default(false),
});

export const instructorSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').regex(/^[a-zA-Z\s\-'.]+$/, 'Name contains invalid characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  bio: z.string().max(1000, 'Bio too long').optional().nullable(),
  specialties: z.array(z.string()).max(10, 'Too many specialties').optional().nullable(),
  hourly_rate: z.number().positive('Hourly rate must be positive').max(500, 'Hourly rate too high').optional().nullable(),
});

export const checkoutSchema = z.object({
  mode: z.enum(['dropin', 'membership', 'private', 'intro'], { message: 'Invalid checkout mode' }),
  session: z.string().optional().nullable(),
  teacher: z.string().optional().nullable(),
  time: z.string().optional().nullable(),
  class_schedule_id: z.string().uuid('Invalid class schedule ID').optional().nullable(),
  class_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional().nullable(),
  student_name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional().nullable(),
  student_email: z.string().email('Invalid email address').optional().nullable(),
  student_phone: z.string().optional().nullable(),
  price: z.number().positive('Price must be positive').max(10000, 'Price too high').optional().nullable(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type ClassInput = z.infer<typeof classSchema>;
export type InstructorInput = z.infer<typeof instructorSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
