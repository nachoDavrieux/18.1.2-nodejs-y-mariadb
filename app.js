const express = require("express");
const mariadb = require("mariadb");
const jwt = require("jsonwebtoken")
const SECRET_KEY = "CLAVE ULTRA SECRETA";
const todoControllers = require("./controllers/todoController");
const todoRouter = require("./routes/todoRoute");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "planning",
    port: "3307",
    connectionLimit: 5,
});

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    
    res.send("<h1>Bienvenido al servidor</h1>");
});

/*****************************************************************************/

app.post("/login", (req, res) => {
  const {username, password} = req.body;
  if(username === "admin" && password === "admin"){
    const token = jwt.sign({username}, SECRET_KEY);
    res.status(200).json(token);
  }else{
    res.status(401).json({message: "Usuario y/o contraseña incorrectos"});
  }
});

//middleware
app.use("/todo", (req, res, next) => { //el next sirve habilitar cuando este todo ok, que pase
  try {
    var decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch(err) {
    console.log(err);
    res.status(401).json({message: "Usuario no autorizado"});
  }
});

app.use("/todo", todoRouter);
//en el fetch en el frontend hay que agregar el encabezado del token para que el servidor lo pueda recibir: 'access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzAwNjU0NTY4fQ.-Agag5lHt9f1Ci-IsmaOwbcUey234iRqq0Ud52M8-xM'
/*****************************************************************************/
app.use("/todo/:id", todoRouter);

// app.get("/todo/:id", async (req, res) => {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       const rows = await conn.query(
//         "SELECT id, NAME, description, created_at, updated_at, status FROM todo WHERE id=?",
//         [req.params.id]
//       );
  
//       res.json(rows[0]);
//     } catch (error) {
//       res.status(500).json({ message: "Se rompió el servidor" });
//     } finally {
//       if (conn) conn.release(); //release to pool
//     }
// });

app.post("/todo", async (req, res) => {
    let conn;
    try {
      console.log("Datos recibidos:", req.body);
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO todo (name, description, status) VALUES (?, ?, ?)`,
        [req.body.name, req.body.description, req.body.status]
      );
  
      res.json({ id: parseInt(response.insertId), ...req.body });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
});

app.put("/todo/:id", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `UPDATE todo SET name=?, description=?, status=? WHERE id=?`,
        [req.body.name, req.body.description, req.body.status, req.params.id]
      );
  
      res.json({ id: req.params.id, ...req.body });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
});

app.delete("/todo/:id", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("DELETE FROM todo WHERE id=?", [
        req.params.id,
      ]);
      res.json({ message: "Elemento eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
  });

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});