import Model from "./model";
import giftsSql from "./mysql";

export default function getModel(): Model {
    return giftsSql;
}