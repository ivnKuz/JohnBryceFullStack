
import DTO from './dto'

export default interface Model { // DTO - data taransfer object
    getAllByAudience(audienceId: number): Promise<DTO[]>;
    add(gift:DTO): Promise<DTO>;
}