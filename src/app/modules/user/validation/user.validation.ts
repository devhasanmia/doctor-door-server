import zod from 'zod';

const createPatientSchema = zod.object({
    password: zod.string().min(8, 'Password must be at least 8 characters long'),
    patient: zod.object({
        name: zod.string().nonempty({ error: 'Name is required' }),
        email: zod.string().nonempty({ error: 'Name is required' }),
        address: zod.string().optional(),
        gender: zod.enum(['MALE', 'FEMALE', 'OTHER'])
    })
})

export const UserValidation = {
    createPatientSchema
}