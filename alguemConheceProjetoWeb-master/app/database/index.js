var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = ":memory:"

const handler = (db, cb) => {
    cb(db);
}

let  db = new Promise((resolve, reject) => {
    let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
            // Cannot open database
            console.error(err.message)
            reject(err);
        }else{
            db.run("CREATE TABLE prestadores (id INTEGER PRIMARY KEY AUTOINCREMENT, nome text, cidade text, estado text, contato text, data_nascimento DATE)", (err) => {
                if (err) {
                    console.error(err);
                } else{
                    db.run("INSERT INTO prestadores ( nome, cidade, estado, contato, data_nascimento) VALUES ('Teste', 'russas', 'CE', '88 99999-9999', '1996-01-01');")
                
                }
            });

            db.run("CREATE TABLE servicos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome text, descricao text, categoria text, prestador_id INTEGER)", (err) => {
                if (err) {
                    console.error(err);
                } else{
                    db.run("INSERT INTO servicos ( nome, descricao, categoria, prestador_id) VALUES ('Teste', 'Teste de serviço', 'TESTE', 1);")
                    console.log('FOi');
                }

            });
            console.log('Connected to the SQLite database.');
            resolve(db);

        }
    })
});
module.exports = db;


