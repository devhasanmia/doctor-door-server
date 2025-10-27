import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await UserService.createPatient(req.file, payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully",
        data: result
    })
})

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) 
    const limit = parseInt(req.query.limit as string)
    const result = await UserService.getAllPatients(page, limit)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Patients fetched successfully",
        data: result
    })
})


export const UserController = {
    createPatient,
    getAllPatients
}