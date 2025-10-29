import { z } from 'zod';


export const movieCreateSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    type: z.enum(['Movie', 'TV Show']),
    director: z.string().max(255).optional().or(z.literal('')),
    budget: z.string().max(100).optional().or(z.literal('')),
    location: z.string().max(255).optional().or(z.literal('')),
    duration: z.string().max(100).optional().or(z.literal('')),
    yearOrTime: z.string().max(100).optional().or(z.literal('')),
    details: z.string().optional().or(z.literal('')),

});


export const movieUpdateSchema = movieCreateSchema.partial();