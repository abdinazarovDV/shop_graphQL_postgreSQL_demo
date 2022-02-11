import sqlQuery from '../../moduleSQL/selection.js'
import res from '../../utils/postgres.js';

export default {
    Query: {
        products: async (_, { product_id = 0, product_name = "", category_id = 0 }) => {
            let result = await res.fetchAll(sqlQuery.products, product_id, product_name, category_id)
            return result
        },

        categories: async (_, { category_id = 0 }) => {
            let result = await res.fetchAll(sqlQuery.categories, category_id)
            console.log(result);
            return result
        }
    },

    Product: {
        category_id: parent => parent.category_id,
        product_id: parent => parent.product_id,
        product_name: parent => parent.product_name,
        price: parent => parent.price,
        short_desc: parent => parent.short_desc,
        long_desc: parent => parent.long_desc
    }
}