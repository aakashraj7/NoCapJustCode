// client/src/components/Register/registrationSchema.js
import { z } from 'zod';

export const memberSchema = z.object({
  fullName: z
    .string({ error: 'Full name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string({ error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address'),
  phone: z
    .string({ error: 'Phone number is required' })
    .trim()
    .transform((val) => val.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, ''))
    .refine((val) => /^[6-9]\d{9}$/.test(val), {
      message: 'Enter a valid 10-digit phone number',
    }),
  department: z
    .string({ error: 'Department is required' })
    .trim()
    .min(2, 'Department is required'),
  year: z.enum(['1', '2', '3', '4'], { error: 'Please select your current year' }),
});

export const registrationSchema = z
  .object({
    pairName: z
      .string()
      .trim()
      .max(60, 'Pair name cannot exceed 60 characters')
      .optional()
      .or(z.literal('')),
    members: z
      .array(memberSchema)
      .length(2, 'Registration requires exactly 2 members'),
  })
  .superRefine((data, ctx) => {
    if (data.members && data.members.length === 2) {
      const [m1, m2] = data.members;

      // Unique emails check
      if (
        m1.email &&
        m2.email &&
        m1.email.toLowerCase().trim() === m2.email.toLowerCase().trim()
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Member 1 and Member 2 must have different email addresses',
          path: ['members', 1, 'email'],
        });
      }

      // Unique phones check (normalized)
      const p1 = (m1.phone || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
      const p2 = (m2.phone || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
      if (p1 && p2 && p1 === p2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Member 1 and Member 2 must have different phone numbers',
          path: ['members', 1, 'phone'],
        });
      }
    }
  });
