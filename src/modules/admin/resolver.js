import { GraphQLUpload } from 'graphql-upload'
import { finished } from 'stream/promises'
import fs from 'fs'
import path from 'path'
import sqlQuery from '../../moduleSQL/admin.js'
import sqlQuerySel from '../../moduleSQL/selection.js'
import res from '../../utils/postgres.js';



export default {

    Query: {
        ordersForAdmin: async (_, { order_id, user_id, username, contact, product_id, product_name, price, category_id, page, limit }) => {
            let result = await res.fetchAll(sqlQuerySel.ordersForAdmin, order_id, user_id, username, contact, product_id, product_name, price, category_id, page * limit - limit, limit)
            // sorted with time desc (milliseconds)
            return {
                status: 200,
                data: result
            }
        },

        totalMoney: async (_, { product_id }) => {

            // 2678400000 - 1 month in milliseconds

            let time = Date.now() - 2678400000
            let result = await res.fetchAll(sqlQuerySel.totalMoney, product_id, time)
            let totalMoney = 0
            result.map(el => totalMoney += +el.total)
            return {
                status: 200,
                total: totalMoney,
                data: result
            }
        },

        users: async (_, { user_id, username, contact, email, page, limit }) => {
            let result = await res.fetchAll(sqlQuerySel.users, user_id, username, contact, email, page * limit - limit, limit)
            return result
        }
    },

    Mutation: {
        add_category: async (_, { category_name }) => {
            let result = await res.fetchAll(sqlQuery.add_category, category_name);

            return result
        },

        edit_category: async (_, { category_id, category_name }) => {
            let result = await res.fetchAll(sqlQuery.edit_category, category_id, category_name);
            return result
        },

        delete_category: async (_, { category_id }) => {
            let result = await res.fetchAll(sqlQuery.delete_category, category_id)
            return result
        },

        add_product: async (_, { category_id, product_name, price,
            short_desc, long_desc, file
        }) => {

            const { createReadStream, filename, mimetype, encoding } = await file
            const stream = createReadStream()
            const fileAddress = path.join(process.cwd(), 'src', 'media', 'image', filename)
            const out = fs.createWriteStream(fileAddress)
            stream.pipe(out)
            await finished(out)

            let result = res.fetchAll(sqlQuery.add_product, category_id, product_name, price, short_desc, long_desc, "media/image" + filename)


            return {
                status: 200,
                message: result
            }
        },

        edit_product: async (_, { product_name, price, short_desc, long_desc, file, category_id, product_id }) => {
            let imagename = ""
            if (file) {
                let { createReadStream, filename, mimetype, encoding } = await file || {}
                const stream = createReadStream()
                imagename = "/media/image" + filename
                const fileAddress = path.join(process.cwd(), 'src', 'media', 'image', filename)
                const out = fs.createWriteStream(fileAddress)
                stream.pipe(out)
                await finished(out)
            }

            let result = await res.fetchAll(sqlQuery.edit_product, product_name, price, short_desc, long_desc, imagename, category_id, product_id)

            return result
        },

        delete_product: async (_, { product_id }) => {
            console.log(product_id);
            let result = await res.fetchAll(sqlQuery.delete_product, product_id)
            console.log(result);
            return {
                status: 200,
                message: "Successfully deleted",
                data: result
            }
        }


    },

    Upload: GraphQLUpload
}