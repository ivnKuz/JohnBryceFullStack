import Model from "./model";
import CredentialsDTO from './credentials-dto';
import UserDTO, {Roles} from './user-dto'
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import { createHash } from 'crypto';
import  config  from "config";

class User implements Model {
    //encrypt password, md5 has a problem that it saves the same strings in same encryption
    private hashPassword(plainTextPassword:string): string{
        return createHash('md5')
        .update(`${plainTextPassword}${config.get<string>('secret')}`) // <= adding some text to hashed password "SALTING"
        .digest('hex');
    }
    public async login(credentials: CredentialsDTO): Promise<UserDTO>{

    }
    public async signUp(user: UserDTO): Promise<UserDTO>{
        const {firstName, lastName, username, password} = user;
        const result: OkPacketParams = await query(`
        INSERT INTO users(firstName, lastName, username, password, roleId) 
        VALUES(?,?,?,?,?) 
    `, [firstName, lastName, username, this.hashPassword(password), Roles.USER]);
    return this.getOne(result.insertId);
    }
}

const user = new User();
export default user;