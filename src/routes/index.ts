import { FastifyInstance } from "fastify"
import { postCreateCustomer } from "./create-customer"
import { postCreateIceCream } from "./create-ice-cream"
import { postAddIceCreamBall } from "./add-ice-cream-ball"
import { deleteIceCreamBall } from "./delete-ice-cream-ball"
import { deleteIceCream } from "./delete-ice-cream"
import { getCustomerData } from "./get-customer-data"
import { getCustomerIceCreams } from "./get-customer-ice-creams"
import { patchRenameIceCream } from "./rename-ice-cream"
import { patchUpdateIceCreamBall } from "./update-ice-cream-ball"
import { patchUpdateIceCreamBase } from "./update-ice-cream-base"
import { postCustomerLogin } from "./customer-login"
import { getValidateCustomer } from "./validate"
import { refresh } from "./refresh"
import { deleteCustomer } from "./delete-customer"
import * as R from "#repositories/sql"
import { patchCustomerInfo } from "./update-customer-info"

export const registerRoutes = (fastify: FastifyInstance) => {
    const iceCreamBallRepo = new R.IceCreamBallRepoSQL()
    const iceCreamCupRepo = new R.IceCreamCupRepoSQL()
    const iceCreamConeRepo = new R.IceCreamConeRepoSQL()
    const iceCreamRepo = new R.IceCreamRepoSQL({
        iceCreamBallRepo,
        iceCreamConeRepo,
        iceCreamCupRepo
    })
    const customerRepo = new R.CustomerRepoSQL({ iceCreamRepo })

    const validateCustomer = getValidateCustomer(customerRepo)

    refresh(fastify, customerRepo)

    postCreateCustomer(fastify, customerRepo)
    postCustomerLogin(fastify, customerRepo)
    postCreateIceCream(
        fastify,
        {
            customerRepo,
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo,
            iceCreamRepo
        },
        validateCustomer
    )
    postAddIceCreamBall(
        fastify,
        { iceCreamBallRepo, iceCreamRepo },
        validateCustomer
    )

    deleteIceCreamBall(fastify, iceCreamBallRepo, validateCustomer)
    deleteIceCream(fastify, iceCreamRepo, validateCustomer)
    deleteCustomer(fastify, customerRepo, validateCustomer)

    getCustomerData(fastify, customerRepo, validateCustomer)
    getCustomerIceCreams(
        fastify,
        {
            customerRepo,
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo,
            iceCreamRepo
        },
        validateCustomer
    )

    patchCustomerInfo(fastify, customerRepo, validateCustomer)
    patchRenameIceCream(fastify, iceCreamRepo, validateCustomer)
    patchUpdateIceCreamBall(
        fastify,
        { iceCreamBallRepo, iceCreamRepo },
        validateCustomer
    )
    patchUpdateIceCreamBase(
        fastify,
        { iceCreamConeRepo, iceCreamCupRepo, iceCreamRepo },
        validateCustomer
    )
}
