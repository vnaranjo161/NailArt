import db from '../config/config-db';
import User from '../Dto/UserDto';
const bcrypt = require("bcryptjs");


class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO usuario (identificacion, nombre, apellido, direccion, telefono, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [user.identificacion, user.nombre, user.apellido, user.direccion, user.telefono, user.correo, user.contrasena];
        return db.execute(sql, values);
    }

    static async auth(correo: String, contrasena: String){
        const sql = 'SELECT contrasena FROM usuario WHERE correo=?';
        const values = [correo];
        return db.execute(sql, values)
    }

    static async validatePassword(contrasena:String, correo: String){
        const sql = 'select contrasena from usuario where correo = ?'
        const values = [contrasena, correo]
        const result: any = db.execute(sql, values)
        const isPasswordValid = await bcrypt.compare(contrasena, result[0][0].contrasena);

        if (isPasswordValid) {
            return true
        }
        return false;
    }

    static async changePassword(contrasena: String, contrasenaNueva: String, correo: String){
        const isPasswordValid = await this.validatePassword(contrasena, correo);
        if (isPasswordValid) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contrasenaNueva, salt); 
            const sql = 'UPDATE usuario SET contrasena = ? WHERE correo = ?';
            const values = [hashedPassword, correo];
            return db.execute(sql, values); 
        }
        return false;
    }
    

}

export default UserRepository;