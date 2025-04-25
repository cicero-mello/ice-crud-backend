import { IceCreamBaseType } from "#enums"
import { IceCreamConeRepo, IceCreamCupRepo, IceCreamRepo } from "#repositories"
import * as schema from "./schemas"
import * as E from "#entities"
import * as T from "./types"

export class GetIceCream implements T.GetIceCreamUseCase {
    public iceCreamRepo: IceCreamRepo
    public iceCreamConeRepo: IceCreamConeRepo
    public iceCreamCupRepo: IceCreamCupRepo

    async execute(params: T.GetIceCreamRequest): Promise<T.GetIceCreamResponse> {
        schema.base.parse(params)

        const {
            iceCream,
            iceCreamDBRow
        } = await this.iceCreamRepo.getById(params.iceCreamId)

        const base = await this.getBase(
            iceCreamDBRow.baseType, iceCream.id
        )

        return {
            iceCream: {
                id: iceCream.id,
                name: iceCream.name,
                baseType: iceCreamDBRow.baseType,
                base: base,
                balls: iceCream.balls
            }
        }
    }

    private async getBase(
        baseType: IceCreamBaseType,
        iceCreamId: string
    ): Promise<E.IceCreamCupProps | E.IceCreamConeProps> {
        if (baseType === IceCreamBaseType.Cone) {
            const { iceCreamCone } = await this.iceCreamConeRepo.getByIceCream(
                iceCreamId
            )
            return {
                color: iceCreamCone.color,
                id: iceCreamCone.id,
                size: iceCreamCone.size
            }
        }

        const { iceCreamCup } = await this.iceCreamCupRepo.getByIceCream(
            iceCreamId
        )
        return {
            size: iceCreamCup.size,
            id: iceCreamCup.id
        }
    }

    constructor(params: T.GetIceCreamUseCaseConstructor) {
        this.iceCreamRepo = params.iceCreamRepo
        this.iceCreamCupRepo = params.iceCreamCupRepo
        this.iceCreamConeRepo = params.iceCreamConeRepo
    }
}
