// client/src/components/Register/registrationSchema.js
import { z } from 'zod';

const phoneRegex = /^[6-9]\d{9}$/;

const baseFields = {
  fullName: z
    .string({ error: 'Full name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z.email({ error: 'Please enter a valid email address' }),
  phone: z
    .string({ error: 'Phone number is required' })
    .trim()
    .regex(phoneRegex, 'Enter a valid 10-digit Indian phone number'),
  college: z
    .string({ error: 'College is required' })
    .trim()
    .min(2, 'College name is required'),
  department: z
    .string({ error: 'Department is required' })
    .trim()
    .min(2, 'Department is required'),
  year: z.enum(['1', '2', '3', '4'], { error: 'Please select your current year' }),
};

export const registrationSchema = z
  .discriminatedUnion('event', [
    // 1. The Training Arc: Individual Registration
    z.object({
      event: z.literal('training-arc'),
      ...baseFields,
    }),

    // 2. TLE: Team of 2 to 4
    z.object({
      event: z.literal('tle'),
      ...baseFields,
      teamName: z
        .string({ error: 'Team name is required' })
        .trim()
        .min(2, 'Team name must be at least 2 characters')
        .max(60, 'Team name cannot exceed 60 characters'),
      teamSize: z.coerce.number().min(2).max(4),
      members: z.array(
        z.object({
          fullName: z
            .string({ error: 'Member full name is required' })
            .trim()
            .min(2, 'Member name must be at least 2 characters'),
          email: z.email({ error: 'Enter a valid member email address' }),
          phone: z
            .string({ error: 'Member phone is required' })
            .trim()
            .regex(phoneRegex, 'Enter a valid 10-digit phone number'),
        })
      ),
    }),
  ])
  .superRefine((data, ctx) => {
    if (data.event === 'tle') {
      const requiredMembers = data.teamSize - 1;
      if (!data.members || data.members.length !== requiredMembers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Please fill details for all ${requiredMembers} additional team members`,
          path: ['members'],
        });
      }
    }
  });
