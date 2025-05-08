import { z } from 'zod';

export const UserSchema = z.object({
    // first_name: z.string().nonempty("This field is required. "),
    // last_name: z.string().nonempty("This field is required. "),
    email: z.string().email(),
    password: z.string().min(8, "Must contain at least 8 characters. ")
        .refine(
            (value) => value.match(/[A-Z]/g),
            'Password needs at least 1 uppercase letter. ')
        .refine(
            (value) => value.match(/[^a-z]/gi),
            'Password needs at least 1 symbol. '),
    birth_date: z.date(),
    accept_terms_conditions: z.boolean().refine(
        (value) => (value),
        'Please accept terms conditions. '),
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})