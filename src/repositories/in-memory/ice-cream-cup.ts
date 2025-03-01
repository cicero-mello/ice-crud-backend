import {
    CreateIceCreamCupParams,
    IceCreamCupDBRow,
    IceCreamCupRepo
} from "#repositories"

export class IceCreamCupRepoInMemory implements IceCreamCupRepo {
    public iceCreamCups: IceCreamCupDBRow[] = []

    async create({
        iceCreamCup,
        iceCreamId
    }: CreateIceCreamCupParams) {
        const { id, size } = iceCreamCup

        this.iceCreamCups.push({
            id, size, iceCreamId
        })

        return {
            id, size, iceCreamId
        }
    }

    async getByIceCream(iceCreamId: string) {
        const cup = this.iceCreamCups.find((cup) => (
            cup.iceCreamId === iceCreamId
        ))

        if(!cup){
            throw new Error("This Ice Cream Doesn't Have Cup!")
        }

        return cup
    }

    async alreadyExists(iceCreamCupId: string) {
        return this.iceCreamCups.some(
            ({ id }) => id === iceCreamCupId
        )
    }
}
