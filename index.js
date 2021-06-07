const express = require('express')
const config = require('config')
const pg = require('pg')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || config.get("server.port")
const uri = process.env.DATABASE_URL || config.get("db.uri");
const secret = process.env.JWT_SECRET || config.get("jwt.secret");

console.log("SECRET==>", secret);

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const pool = new pg.Pool ({
    connectionString: uri,
    ssl: {
        rejectUnauthorized: false
    }
})

app.route('/reset').get((req, res) => { 
    let qry = "DROP TABLE IF EXISTS login;"
    qry += "CREATE TABLE login ("
    qry += "email varchar(50),"
    qry += "senha int,"
    qry += "nome varchar(50),"
    qry += "cpf int,"
    qry += "dataNascimento varchar(10)"
    qry += ");"
    qry += "INSERT INTO login (email, senha, nome, cpf, dataNascimento) "
    qry += "VALUES ('administrador', '123456789', 'Administrador', '11110110111', '17/02/1980');";
    pool.query(qry, (err, dbres) => {
        if (err) { 
            res.status(500).send(err)
        } else { 
            res.status(200).send("Banco de dados resetado")
        }
    })
})

app.route('/login').post((req, res) => { 
    console.log("Request ==> ", req.body);
    let qry = `SELECT * FROM usuarios WHERE login = '${req.body.email}' `;
    qry += ` AND senha = '${req.body.senha}';`;
    console.log("Query==>", qry);
    pool.query(qry, (err, dbres) => {
        if (err) { 
            res.status(500).send(err);
        } else { 
            console.log("Foram encontrados ", dbres.rowCount, " registros");
            console.log(dbres.rows);
            if (dbres.rowCount > 0) { 
                const row = dbres.rows[0];
                console.log("1ª Linha==>", row);
                const payload = {
                    email: row.email,
                    dataNascimento: row.dataNascimento,
                    nome: row.nome,
                }
                const token = jwt.sign(payload, secret);
                console.log("Token => ", token);
                const objToken = {token};
                res.status(200).json(objToken);
            } else { 
                res.status(401).send("Usuário ou senha inválidos");
            }
        }
    })
});

app.listen(port, () => { 
    console.log("Iniciando o servidor na porta ", port)
})

console.log("Inicio do projeto")