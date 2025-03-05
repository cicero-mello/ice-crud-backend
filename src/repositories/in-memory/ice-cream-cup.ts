import { IceCreamCup } from "#entities"
import {
    CreateIceCreamCupParams,
    IceCreamCupResponse,
    IceCreamCupDBRow,
    IceCreamCupRepo
} from "#repositories"

export class IceCreamCupRepoInMemory implements IceCreamCupRepo {
    public iceCreamCups: IceCreamCupDBRow[] = []

    async create({
        iceCreamCup,
        iceCreamId
    }: CreateIceCreamCupParams): Promise<IceCreamCupDBRow> {
        const { id, size } = iceCreamCup

        this.iceCreamCups.push({
            id, size, iceCreamId
        })

        return {
            id, size, iceCreamId
        }
    }

    async update({
        iceCreamCup,
        iceCreamId
    }: CreateIceCreamCupParams): Promise<IceCreamCupResponse> {
        const { id, size } = iceCreamCup

        this.iceCreamCups = this.iceCreamCups.map((cup) => {
            if (cup.iceCreamId === iceCreamId) {
                return { id, iceCreamId, size }
            }
            return cup
        })

        return {
            iceCreamCupDBRow: { id, iceCreamId, size },
            iceCreamCup: iceCreamCup
        }
    }

    async getByIceCream(iceCreamId: string): Promise<
        IceCreamCupResponse
    > {
        const cup = this.iceCreamCups.find((cup) => (
            cup.iceCreamId === iceCreamId
        ))

        if (!cup) {
            throw new Error("This Ice Cream Doesn't Have Cup!")
        }

        return {
            iceCreamCupDBRow: cup,
            iceCreamCup: new IceCreamCup({
                size: cup.size,
                id: cup.id
            })
        }
    }

    async deleteByIceCream(iceCreamId: string): Promise<void>{
        this.iceCreamCups = this.iceCreamCups.filter(cup => (
            cup.iceCreamId != iceCreamId
        ))
    }

    async iceCreamHaveCup(iceCreamId: string): Promise<boolean> {
        return this.iceCreamCups.some(
            (cup) => cup.iceCreamId === iceCreamId
        )
    }

    async alreadyExists(iceCreamCupId: string): Promise<boolean> {
        return this.iceCreamCups.some(
            ({ id }) => id === iceCreamCupId
        )
    }
}
