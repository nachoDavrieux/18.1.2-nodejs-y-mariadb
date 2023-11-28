const { response } = require("express");
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

const getUsersById = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
        "SELECT id, NAME, description, created_at, updated_at, status FROM todo WHERE id = ?", [id]
        );
  
        return rows[0];
    } catch (error) {
        console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
};

const createUser = async (user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
        'INSERT INTO todo ( name, description status) VALUE (?,?,?)', 
        [user.name, user.description, user.status]
        );
  
        return {id: parseInt(response.insertId), ...user};
    } catch (error) {
        console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
};

const updateUser = async (id, user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
        'UPDATE todo SET name = ?, description = ?, status = ? WHERE id = ?', 
        [user.name, user.description, user.status, id]
        );
  
        return {id, ...user};
    } catch (error) {
        console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
};

const deleteUser = async (user) => {

}

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
};