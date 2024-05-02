import UserRepository from "../repositories/UserRepository";
import middlewareToken from "../middleware/middlewareToken";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"


let changePassword = async (req: Request, res: Response) => {
    try {
        const { contrasena, contrasenaNueva } = req.body;
        if (!contrasena || !contrasenaNueva) {
            return res.status(400).json({ message: "Both old and new passwords are required." });
        }
        const token: string = req.cookies.token;
        const tokenValidate = middlewareToken.validateToken(token);
        const decodedToken: any = jwt.decode(token, { json: true });
        if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.correo) {
            return res.status(401).json({ message: "Invalid token payload." });
        }
        const correo = decodedToken.correo;

        const changeResult = await UserRepository.changePassword(contrasena, contrasenaNueva, correo);

        if (changeResult) {
            return res.status(200).json({ message: "Password updated successfully." });
        } else {
            return res.status(400).json({ message: "Failed to update password. Please check your old password." });
        }
    } catch (error: any) {
        return res.status(500).json({ errorInfo: "Internal server error.", error: error.message });
    }
}

export default changePassword; 
