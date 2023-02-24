import { IReturnType } from "../interfaces/return-type.interface";

export function paginateResponse(data: any): IReturnType {
    const [result, total] = data;
    return {data: result, total}
}