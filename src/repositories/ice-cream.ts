import { IceCream } from "#entities"
import { IceCreamBaseType } from "#enums"

export interface IceCreamDBRow {
    id: string
    customerId: string
    name: string
    baseType: IceCreamBaseType
}

export interface CreateIceCreamRepoParams {
    iceCream: IceCream
    customerId: string
    baseType: IceCreamBaseType
}

export interface DeleteIceCreamRepoParams {
    iceCreamId: string
}

export interface IceCreamRepo {
    iceCreams: IceCreamDBRow[]
    alreadyExists(iceCreamId: string): Promise<boolean>
    create(params: CreateIceCreamRepoParams): Promise<IceCreamDBRow>
    delete(params: DeleteIceCreamRepoParams): Promise<void>
    getByCustomer(customerId: string): Promise<IceCreamDBRow[]>
}
