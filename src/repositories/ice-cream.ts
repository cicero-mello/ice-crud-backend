import { IceCream, IceCreamCone, IceCreamCup } from "#entities"
import { IceCreamBaseType } from "#enums"
import { IceCreamBallRepo } from "./ice-cream-ball"
import { IceCreamConeRepo } from "./ice-cream-cone"
import { IceCreamCupRepo } from "./ice-cream-cup"

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

export interface IceCreamRepoResponse {
    iceCream: IceCream
    iceCreamDBRow: IceCreamDBRow
}

export interface GetBaseIceCreamRepoResponse {
    base: IceCreamCup | IceCreamCone
    baseType: IceCreamBaseType
}

export interface UpdateBaseTypeParams {
    baseType: IceCreamBaseType
    iceCreamId: string
}

export interface IceCreamRepo {
    iceCreamCupRepo: IceCreamCupRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamBallRepo: IceCreamBallRepo

    alreadyExists(iceCreamId: string): Promise<boolean>
    create(params: CreateIceCreamRepoParams): Promise<IceCreamDBRow>
    update(iceCream: IceCream): Promise<void>
    updateBaseType(baseType: UpdateBaseTypeParams): Promise<void>
    delete(params: DeleteIceCreamRepoParams): Promise<void>
    getByCustomer(customerId: string): Promise<IceCreamDBRow[]>
    getById(iceCreamId: string): Promise<IceCreamRepoResponse>
    getBase(iceCream: IceCream): Promise<
        GetBaseIceCreamRepoResponse
    >
}

export interface IceCreamRepoConstructor {
    iceCreamCupRepo: IceCreamCupRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamBallRepo: IceCreamBallRepo
}
