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

    async alreadyExists(iceCreamCupId: string) {
        return this.iceCreamCups.some(
            ({ id }) => id === iceCreamCupId
        )
    }
}
