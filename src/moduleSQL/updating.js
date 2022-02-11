export default {
    user_add: `
        insert into users (username, contact, email, password) 
        values ($1, $2, $3, crypt($4, gen_salt('bf')))
        returning *
    `,

    check_user: `
        select
            *
        from users as u
        where password = crypt($1, password) and username = $2
    `,

    add_order: `
        insert into orders (user_id, product_id, time) 
        values ($1, $2, $3)
        returning *
    `,

    delete_order: `
        delete from orders where user_id = $1 and order_id = $2 and is_paid = false
        returning *
    `,

    paid: `
        update orders as o set
            is_paid = true
        where o.user_id = $1 and o.order_id = $2
        returning *
    `
}