import { FastifyInstance } from "fastify"
import * as R from "#repositories/sql"
import { postCreateCustomer } from "./create-customer"

export const registerRoutes = (fastify: FastifyInstance) => {
    const customerRepo = new R.CustomerRepoSQL()
    // const iceCreamBallRepo = new R.IceCreamBallRepoSQL()
    // const iceCreamCupRepo = new R.IceCreamCupRepoSQL()
    // const iceCreamConeRepo = new R.IceCreamConeRepoSQL()
    // const iceCreamRepo = new R.IceCreamRepoSQL({
    //     iceCreamBallRepo,
    //     iceCreamConeRepo,
    //     iceCreamCupRepo
    // })

    postCreateCustomer(fastify, customerRepo)
}
