import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'mysql',
    user: 'root',
    database: 'blog',
    password: '1144dfafsd',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool