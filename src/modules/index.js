import UserModule from './user/index.js'
import ProductModule from './products/index.js'
import OrderModule from './orders/index.js'
import AdminModule from './admin/index.js'

export default {
    typeDefs: [
        UserModule.typeDefs,
        ProductModule.typeDefs,
        OrderModule.typeDefs,
        AdminModule.typeDefs
    ],
    resolvers: [
        UserModule.resolvers,
        ProductModule.resolvers,
        OrderModule.resolvers,
        AdminModule.resolvers
    ]
}