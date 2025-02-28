import {
    CreateIceCreamRepoParams,
    DeleteIceCreamRepoParams,
    IceCreamDBRow,
    IceCreamRepo
} from "#repositories"

export class IceCreamRepoInMemory implements IceCreamRepo {
    public iceCreams: IceCreamDBRow[] = []

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

    async delete({
        iceCreamId
    }: DeleteIceCreamRepoParams) {
        const iceCreamExists = await this.alreadyExists(
            iceCreamId
        )

        if (!iceCreamExists) {
            throw new Error("This id does not match an existing Ice Cream!")
        }

        const index = this.iceCreams.findIndex(
            ({ id }) => id === iceCreamId
        )

        this.iceCreams.splice(index, 1)
    }

    async alreadyExists(iceCreamId: string) {
        return this.iceCreams.some(
            ({ id }) => id === iceCreamId
        )
    }
}
