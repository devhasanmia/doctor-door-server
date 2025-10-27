import { sendImage } from "../../helpers/fileUploder";
import { prisma } from "../../shared/prisma";
import { TUser } from "./user.type";
import bcrypt from "bcryptjs";

const createPatient = async (file: Express.Multer.File | undefined, payload: TUser) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // Optional Profile Picture Upload
  let profilePicture: string | null = null;

  if (file?.path) {
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
    const imageName = `${payload.name}-${randomString}`;
    const { secure_url } = await sendImage(file.path, imageName);
    profilePicture = secure_url;
  }

  const result = await prisma.$transaction(async (tx) => {
    // Create user
    await tx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });

    // Create patient
    return await tx.patient.create({
      data: {
        name: payload.name,
        email: payload.email,
        gender: payload.gender,
        profilePicture: profilePicture,
      },
    });
  });

  return result;
};

const getAllPatients = async (page: number, limit: number) => {
  // Calculate offset
  const offset = (page - 1) * limit;
  // fetch patients with pagination
  const patients = await prisma.patient.findMany({
    skip: offset,
    take: limit
  })
  return patients
}

export const UserService = {
  createPatient,
  getAllPatients
};
