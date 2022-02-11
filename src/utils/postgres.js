import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'btlbieig',
    password: 'gWX2V0LacP4zqtC7iGlza5RJJb4RgKK6',
    host: 'tyke.db.elephantsql.com',
    database: 'btlbieig',
})

async function fetch(query, ...params) {
    const client = await pool.connect()
    try {
        const { rows: [row] } = await client.query(query, params.length ? params : null)
        return row
    } catch (error) {
        console.log(error)
    }
}

async function fetchAll(query, ...params) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, params.length ? params : null)
        return rows
    } catch (error) {
        console.log(error)
    }
}

export default {
    fetchAll,
    fetch
}