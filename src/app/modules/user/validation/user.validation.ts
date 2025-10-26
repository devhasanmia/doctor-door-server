import zod from 'zod';

const createPatientSchema = zod.object({
    password: zod.string().min(8, 'Password must be at least 8 characters long'),
    patient: {
        name: zod.string({error: 'Name is required'}),
        email: zod.string({error: 'Invalid email address'}),
        address: zod.string({error: 'Address is required'}),
    }
})