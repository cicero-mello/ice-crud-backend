import { IceCream, IceCreamCone, IceCreamCup } from "#entities"
import { IceCreamBaseType } from "#enums"
import {
    CreateIceCreamRepoParams,
    DeleteIceCreamRepoParams,
    GetBaseIceCreamRepoResponse,
    IceCreamBallRepo,
    IceCreamConeRepo,
    IceCreamCupRepo,
    IceCreamDBRow,
    IceCreamRepo,
    IceCreamRepoConstructor,
    IceCreamRepoResponse
} from "#repositories"

export class IceCreamRepoInMemory implements IceCreamRepo {
    public iceCreams: IceCreamDBRow[] = []
    public iceCreamCupRepo: IceCreamCupRepo
    public iceCreamConeRepo: IceCreamConeRepo
    public iceCreamBallRepo: IceCreamBallRepo

    async create({
        iceCream, baseType, customerId
    }: CreateIceCreamRepoParams) {
        const { id, name } = iceCream

        this.iceCreams.push({
            id, name, customerId, baseType
        })

        return {
            id, name, customerId, baseType
        }
    }

    async update(iceCream: IceCream){
        const { base, baseType } = await this.getBase(iceCream)
        if(base instanceof IceCreamCone){
            await this.iceCreamConeRepo.update({
                iceCreamCone: base,
                iceCreamId: iceCream.id
            })
        }
        if(base instanceof IceCreamCup){
            await this.iceCreamCupRepo.update({
                iceCreamCup: base,
                iceCreamId: iceCream.id
            })
        }

        iceCream.balls.forEach((ball) => {
            this.iceCreamBallRepo.update({
                iceCreamBall: ball,
                iceCreamId: iceCream.id
            })
        })

        this.iceCreams = this.iceCreams.map((repoIceCream) => {
            if(repoIceCream.id === iceCream.id){
                return {
                    baseType: baseType,
                    customerId: repoIceCream.customerId,
                    id: iceCream.id,
                    name: iceCream.name
                }
            }
            return repoIceCream
        })
    }

    async delete({
        iceCreamId
    }: DeleteIceCreamRepoParams) {
        const index = this.iceCreams.findIndex(
            ({ id }) => id === iceCreamId
        )
        if (index === -1) {
            throw new Error("This id does not match an existing Ice Cream!")
        }
        this.iceCreams.splice(index, 1)
    }

    async getByCustomer(customerId: string) {
        const iceCreams = this.iceCreams.filter((iceCream) => (
            iceCream.customerId === customerId
        ))

        return iceCreams
    }

    async getById(iceCreamId: string): Promise<IceCreamRepoResponse> {
        const iceCreamDBRow = this.iceCreams.find(
            ({ id }) => id === iceCreamId
        )
        if (!iceCreamDBRow) {
            throw new Error("This id does not match an existing Ice Cream!")
        }

        const balls = await this.iceCreamBallRepo.getByIceCream(iceCreamId)

        let base: IceCreamCone| IceCreamCup
        if(iceCreamDBRow.baseType === IceCreamBaseType.Cone) {
            const { iceCreamCone } = await this.iceCreamConeRepo.getByIceCream(iceCreamId)
            base = iceCreamCone
        }
        else {
            const { iceCreamCup } = await this.iceCreamCupRepo.getByIceCream(iceCreamId)
            base = iceCreamCup
        }

        return {
            iceCreamDBRow,
            iceCream: new IceCream({
                id: iceCreamDBRow.id,
                name: iceCreamDBRow.name,
                base: base,
                balls: balls.map(({ iceCreamBall }) => iceCreamBall),
            })
        }
    }

    async getBase(iceCream: IceCream): Promise<GetBaseIceCreamRepoResponse> {
        let base: IceCreamCup | IceCreamCone
        let baseType: IceCreamBaseType
        if(iceCream.base instanceof IceCreamCone) {
            const { iceCreamCone } = await this.iceCreamConeRepo.getByIceCream(
                iceCream.id
            )
            base = iceCreamCone
            baseType = IceCreamBaseType.Cone
        }
        else {
            const { iceCreamCup } = await this.iceCreamCupRepo.getByIceCream(
                iceCream.id
            )
            base = iceCreamCup
            baseType = IceCreamBaseType.Cup
        }

        return { base, baseType }
    }

    async alreadyExists(iceCreamId: string) {
        return this.iceCreams.some(
            ({ id }) => id === iceCreamId
        )
    }

    constructor(params: IceCreamRepoConstructor) {
        this.iceCreamBallRepo = params.iceCreamBallRepo
        this.iceCreamConeRepo = params.iceCreamConeRepo
        this.iceCreamCupRepo = params.iceCreamCupRepo
    }
}
