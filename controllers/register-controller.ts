import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import { Request, Response } from "express";

let register = async (req: Request, res: Response) => {
  try {
    const {
      identificacion,
      nombre,
      apellido,
      direccion,
      telefono,
      correo,
      contrasena,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);
    const result = await UserRepository.add(new User(identificacion, nombre, apellido, direccion, telefono,correo, hashedPassword));
    
    return res.status(201).send(
      { status: 'register ok', password_hasheado: hashedPassword }
    );
  } catch (error: any) {
    if (error && error.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ errorInfo: "La identificación o correo electrónico ya existe en la base de datos." });
    }
    return res.status(500).send({ errorInfo: "Ha ocurrido un error interno del servidor.", error });
  }
}



export default register;