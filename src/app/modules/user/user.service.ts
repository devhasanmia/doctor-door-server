import { prisma } from "../../shared/prisma";
import { TUser } from "./user.type";
import bcrypt from "bcryptjs";

const createPatient = async (payload: TUser) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.$transaction(async (tx) => {
        // Create user
        await tx.user.create({
            data: {
                email: payload.email,
                password: hashedPassword,
            },
        });

        // create patient profile
        return await tx.patient.create({
            data: {
                name: payload.name,
                email: payload.email,
                gender: payload.gender
            }
        })
    });

    return result;
};

export const UserService = {
    createPatient,
};
