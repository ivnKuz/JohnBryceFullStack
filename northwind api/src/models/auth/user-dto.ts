import CredentialsDTO from './credentials-dto'

export default interface DTO extends CredentialsDTO{
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    roleId: number
}

export enum Roles{

    ADMIN = 1,
    USER = 2
}