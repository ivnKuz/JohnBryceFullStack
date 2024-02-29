
import DTO from './dto'

export default interface Model { // DTO - data taransfer object
    loremipsum(lorem: DTO): Promise<DTO>;
}