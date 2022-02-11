import queryParser from '../helpers/queryParser.js'
import Token from './jwt.js'

export default function ({ req }) {
    const { operation, fieldName, variables } = queryParser(req.body)
    if (fieldName == 'getOrderforUser' || fieldName == 'add_order'
        || fieldName == 'delete_order' || fieldName == 'paid'
    ) {
        let { token } = req.headers
        let { user_id, agent } = Token.verify(token)
        if (!req.headers['user-agent'] == agent) throw new Error("Anather user")
        return {
            user_id
        }
    } else if (fieldName == 'register' || fieldName == 'login') {
        return {
            agent: req.headers['user-agent']
        }
    } else if (['add_category', 'edit_category', 'delete_category', 'add_product', 'edit_product', 'delete_product', 'ordersForAdmin', 'totalMoney'].includes(fieldName)) {
        let { token } = req.headers
        let { user_id, agent } = Token.verify(token)
        // [admin's user_ids]
        if ([1].includes(user_id)) {
            return {
                user_id
            }
        } else throw new Error('Only admins')
    }
    return
}