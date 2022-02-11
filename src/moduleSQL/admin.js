export default {
    add_category: `
        insert into categories (category_name) values ($1)
        returning *
    `,

    edit_category: `
        update categories as c set
            category_name = $2
        where c.category_id = $1
        returning *
    `,

    delete_category: `
        delete from categories where category_id = $1
        returning *
    `,

    add_product: `
        insert into products (category_id, product_name, price, short_desc, long_desc, picture)
        values ($1, $2, $3, $4, $5, $6)
        returning *
    `,

    edit_product: `
        update products as p set
            product_name = (
                case 
                    when length($1) > 0 then $1 else p.product_name
                end
            ),
            price = (
                case 
                    when $2 > 0 then $2 else p.price
                end
            ),
            short_desc = (
                case 
                    when length($3) > 0 then $3 else p.short_desc
                end
            ),
            long_desc = (
                case 
                    when length($4) > 0 then $4 else p.long_desc
                end
            ),
            picture = (
                case
                    when length($5) > 0 then $5 else p.picture
                end
            ),
            category_id = (
                case
                    when $6 > 0 then $6 else p.category_id
                end
            )
        
        where product_id = $7
        returning *
    `,

    delete_product: `
        delete from products where product_id = $1
        returning *
    `



}