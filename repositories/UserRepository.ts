import db from '../config/config-db';
import User from '../Dto/UserDto';

class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO usuario (identificacion, nombre, apellido, direccion, telefono, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [user.identificacion, user.nombre, user.apellido, user.direccion, user.telefono, user.correo, user.contrasena];
        return db.execute(sql, values);
    }

    static async auth(correo: string, contrasena: string){
        const sql = 'SELECT contrasena FROM usuario WHERE correo=?';
        const values = [correo];
        return db.execute(sql, values)
    }
}


export default UserRepository;