const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "planning",
    port: "3307",
    connectionLimit: 5,
});

const getUsers = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
        "SELECT id, NAME, description, created_at, updated_at, status FROM todo"
        );
  
        return rows;

    } catch (error) {
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
};

module.exports = {
    getUsers,
};