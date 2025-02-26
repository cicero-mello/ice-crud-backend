import {
    CreateIceCreamConeParams,
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
        const alreadyExists = await this.alreadyExists(id)

        if(alreadyExists){
            throw new Error("This Cone Already Exists!")
        }

        this.iceCreamCones.push({
            color, size, id, iceCreamId
        })
    }

    async alreadyExists(iceCreamConeId: string) {
        return this.iceCreamCones.some(
            ({ id }) => id === iceCreamConeId
        )
    }
}
