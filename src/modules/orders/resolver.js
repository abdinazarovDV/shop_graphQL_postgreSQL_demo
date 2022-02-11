import sqlQuery from '../../moduleSQL/selection.js'
import sqlQueryUpdating from '../../moduleSQL/updating.js'
import res from '../../utils/postgres.js';

export default {
    Query: {
        getOrderforUser: async (_, { page, limit }, { user_id }) => {
            console.log(user_id)
            let result = await res.fetchAll(sqlQuery.ordersForUserUnPaid, user_id, page * limit - limit, limit)
            return result
        }
    },

    Mutation: {
        add_order: async (_, { product_id }, { user_id }) => {
            let result = await res.fetchAll(sqlQueryUpdating.add_order, user_id, product_id, Date.now())
            return {
                status: 200,
                message: "Order successfully added",
                data: result
            }
        },

        delete_order: async (_, { order_id }, { user_id }) => {
            let result = await res.fetchAll(sqlQueryUpdating.delete_order, user_id, order_id)
            if (!result.length) throw new Error(`Order not definded`)
            return {
                status: 200,
                message: "Order successfully deleted",
                data: result
            }
        },

        paid: async (_, { order_id }, { user_id }) => {
            console.log(order_id, user_id)
            let result = await res.fetchAll(sqlQueryUpdating.paid, user_id, +order_id)
            if (!result.length) throw new Error(`Order not definded`)
            return {
                status: 200,
                message: "Successfully paid",
                data: result
            }
        }
    }
}