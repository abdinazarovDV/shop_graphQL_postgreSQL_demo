import res from '../../utils/postgres.js';
import sqlQuery from '../../moduleSQL/updating.js'
import Token from '../../utils/jwt.js'

export default {
    Mutation: {
        register: async (_, { username, password, contact, email }, { agent }) => {
            let result = await res.fetchAll(sqlQuery.user_add, username, contact, email, password)
            return {
                data: result,
                token: Token.sign({ user_id: result[0].user_id, agent })
            }
        },

        login: async (_, { username, password }, { agent }) => {
            console.log(username, password);
            let result = await res.fetchAll(sqlQuery.check_user, password, username)

            if (!result.length) return { status: 401, message: "unauthorized user" }

            return {
                data: result,
                token: Token.sign({ user_id: result[0].user_id, agent })
            }
        }
    }
}