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
        const index = this.iceCreams.findIndex(
            ({ id }) => id === iceCreamId
        )
        if (index === -1) {
            throw new Error("This id does not match an existing Ice Cream!")
        }
        this.iceCreams.splice(index, 1)
    }

    async alreadyExists(iceCreamId: string) {
        return this.iceCreams.some(
            ({ id }) => id === iceCreamId
        )
    }
}
