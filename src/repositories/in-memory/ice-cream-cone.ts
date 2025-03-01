import { IceCreamCone } from "#entities"
import {
    CreateIceCreamConeParams,
    IceCreamConeResponse,
    IceCreamConeDBRow,
    IceCreamConeRepo
} from "#repositories"

export class IceCreamConeRepoInMemory implements IceCreamConeRepo {
    public iceCreamCones: IceCreamConeDBRow[] = []

    async create({
        iceCreamCone,
        iceCreamId
    }: CreateIceCreamConeParams) {
        const { id, color, size } = iceCreamCone

        this.iceCreamCones.push({
            color, size, id, iceCreamId
        })

        return {
            color, size, id, iceCreamId
        }
    }

    async update({
        iceCreamCone,
        iceCreamId
    }: CreateIceCreamConeParams): Promise<IceCreamConeResponse> {
        const { id, color, size } = iceCreamCone

        this.iceCreamCones = this.iceCreamCones.map((cone) => {
            if (cone.id === id) {
                return { id, iceCreamId, color, size }
            }
            return cone
        })

        return {
            iceCreamConeDBRow: { id, iceCreamId, color, size },
            iceCreamCone: iceCreamCone
        }
    }

    async getByIceCream(iceCreamId: string): Promise<
        IceCreamConeResponse
    > {
        const cone = this.iceCreamCones.find((cone) => (
            cone.iceCreamId === iceCreamId
        ))

        if (!cone) {
            throw new Error("This Ice Cream Doesn't Have Cone!")
        }

        return {
            iceCreamConeDBRow: cone,
            iceCreamCone: new IceCreamCone({
                color: cone.color,
                size: cone.size,
                id: cone.id
            }),
        }
    }

    async alreadyExists(iceCreamConeId: string) {
        return this.iceCreamCones.some(
            ({ id }) => id === iceCreamConeId
        )
    }
}
