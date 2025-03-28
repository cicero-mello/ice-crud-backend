import { IceCreamBaseType } from "#enums"
import { zodValidate } from "#utils"
import * as E from "#entities"
import * as R from "#repositories"
import * as T from "./types"

export class GetCustomerIceCreams implements T.GetCustomerIceCreamsUseCase {
    public iceCreamRepo: R.IceCreamRepo
    public iceCreamBallRepo: R.IceCreamBallRepo
    public iceCreamConeRepo: R.IceCreamConeRepo
    public iceCreamCupRepo: R.IceCreamCupRepo
    public customerRepo: R.CustomerRepo

    async execute({
        customerId
    }: T.GetCustomerIceCreamsRequest) {
        zodValidate.id.parse(customerId)
        await this.validate(customerId)

        const iceCreams = await this.iceCreamRepo.getByCustomer(
            customerId
        )

        const iceCreamsDatas: E.IceCreamData[] = await Promise.all(
            iceCreams.map(async (iceCream) => {
                const base = await this.getBase(
                    iceCream.baseType, iceCream.id
                )

                const balls = await this.getBalls(iceCream.id)

                const iceCreamData: E.IceCreamData = {
                    id: iceCream.id,
                    name: iceCream.name,
                    balls: balls,
                    base: base,
                    baseType: iceCream.baseType
                }

                return iceCreamData
            })
        )

        return {
            iceCreams: iceCreamsDatas
        }
    }

    private async validate(customerId: string) {
        const customerExists = await this.customerRepo.alreadyExists(
            customerId
        )

        if(!customerExists) {
            throw new Error("This Costumer ID Doesn't Match Any Costumer!")
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

    private async getBalls(iceCreamId: string): Promise<E.IceCreamBallProps[]> {
        const response = await this.iceCreamBallRepo.getByIceCream(
            iceCreamId
        )

        return response.map(({ iceCreamBall }) => ({
            flavor: iceCreamBall.flavor,
            id: iceCreamBall.id,
            size: iceCreamBall.size
        }))
    }

    constructor(params: T.GetCustomerIceCreamsConstructor) {
        this.iceCreamRepo = params.iceCreamRepo
        this.iceCreamBallRepo = params.iceCreamBallRepo
        this.iceCreamConeRepo = params.iceCreamConeRepo
        this.iceCreamCupRepo = params.iceCreamCupRepo
        this.customerRepo = params.customerRepo
    }
}
