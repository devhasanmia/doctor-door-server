import { prisma } from "../../shared/prisma";
import { TUser } from "./user.type";
import bcrypt from "bcryptjs";

const createPatient = async (payload: TUser) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.$transaction(async (tx) => {
        // 1️⃣ Create user
        const user = await tx.user.create({
            data: {
                email: payload.email,
                password: hashedPassword,
                role: "PATIENT",
            },
        });

        //  create patient profile
        await tx.patient.create({
            data: {
                name: payload.name,
                email: payload.email,
                gender: payload.gender
            }
        })


        return { user };
    });

    return result;
};

export const UserService = {
    createPatient,
};
