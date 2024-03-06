import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'mysql',
    user: 'blog_user',
    database: 'blog',
    password: '1144dfafsd',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool