import jwt from 'jsonwebtoken';

export default {
    sign: (payload) => jwt.sign(payload, "qwmnazpl"),
    verify: (token) => jwt.verify(token, "qwmnazpl")
}