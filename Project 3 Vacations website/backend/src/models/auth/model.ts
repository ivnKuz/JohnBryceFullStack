import CredentialsDTO from './credentials-dto';
import UserDTO from './user-dto'

export default interface Model {
    login(credentials: CredentialsDTO): Promise<UserDTO>;
    signUp(user: UserDTO): Promise<UserDTO>;
    getOne(id:number): Promise<UserDTO>;
}