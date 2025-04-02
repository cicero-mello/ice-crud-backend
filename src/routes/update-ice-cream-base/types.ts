import { IceCreamConeProps, IceCreamCupProps } from "#entities"
import { IceCreamBaseType } from "#enums"
import { IceCreamConeRepo, IceCreamCupRepo, IceCreamRepo } from "#repositories"
import { FastifyRequest as FR } from "fastify"

export interface PatchUpdateIceCreamBaseRequest {
    iceCreamId: string
    baseType: IceCreamBaseType
    base: Omit<IceCreamConeProps, "id"> | Omit<IceCreamCupProps, "id">
}

export type FastifyRequest = FR<{
    Body: PatchUpdateIceCreamBaseRequest
}>

export interface Repos {
    iceCreamRepo: IceCreamRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
}
