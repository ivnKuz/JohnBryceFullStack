
import DTO from './dto'

export default interface Model { // DTO - data taransfer object
    getAll(): Promise<DTO[]>;
}