export default {
    products: `
        select
            c.category_name,
            p.*
        from products as p
        inner join categories as c on p.category_id = c.category_id
        where
            case
                when $1 > 0 then p.product_id = $1
                else true
            end and
            case
                when length($2) > 0 then p.product_name ilike concat('%', $2, '%')
                else true
            end and 
            case
                when $3 > 0 then c.category_id = $3
                else true
            end
        offset $4 limit $5
    `,

    categories: `
        select 
            * 
        from categories as c
        where
            case
                when $1 > 0 then c.category_id = $1
                else true
            end
        offset $2 limit $3
    `,

    ordersForUserUnPaid: `
        select
            o.order_id,
            c.category_name,
            p.product_name,
            p.price,
            p.short_desc,
            p.long_desc,
            picture
        from orders as o
        inner join products as p on o.product_id = p.product_id
        inner join categories as c on p.category_id = c.category_id
        where
            case
                when $1 > 0 then o.user_id = $1
            end and
            case
                when 1 > 0 then o.is_paid = 'false'
            end
        offset $2 limit $3
    `,

    ordersForAdmin: `
        select
            o.order_id,
            u.user_id,
            u.username,
            u.contact,
            p.product_id,
            p.product_name,
            p.price,
            p.category_id
        from orders as o
        inner join products as p on o.product_id = p.product_id
        inner join users as u on u.user_id = o.user_id
        where 
            case
                when $1 > 0 then o.order_id = $1
                else true
            end and
            case
                when $2 > 0 then o.user_id = $2
                else true
            end and
            case
                when length($3) > 0 then u.username = $3
                else true
            end and
            case
                when length($4) > 0 then u.contact = $4
                else true
            end and
            case
                when $5 > 0 then o.product_id = $5
                else true
            end and
            case
                when length($6) > 0 then p.product_name ilike concat('%', $6, '%')
                else true
            end and
            case
                when $7 > 0 then p.price = $7
                else true
            end and
            case
                when $8 > 0 then p.category_id = $8
                else true
            end
        order by o.time desc
        offset $9 limit $10
    `,

    users: `
        select * from users as u
        where
            case
                when $1 > 0 then u.user_id = $1
                else true
            end and
            case
                when length($2) > 0 then u.username = $2
                else true
            end and
            case
                when length($3) > 0 then u.contact = $3
                else true
            end and
            case
                when length($4) > 0 then u.email = $4
                else true
            end
        offset $5 limit $6
    `,

    totalMoney: `
        select
            p.product_id,
            p.product_name,
            p.price,
            count(p.product_id),
            sum(p.price) as total
        from orders as o
        inner join products as p on o.product_id = p.product_id
        where
            case
                when $1 > 0 then p.product_id = $1
                else true
            end and
            case
                when 1 > 0 then o.time > $2
            end
        group by p.product_id
        order by count desc
        offset $3 limit $4
    `

}