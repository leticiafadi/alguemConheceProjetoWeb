const Base = require("./Base");
const {static} = require("express");

class Servico extends Base {
    id = null;
    nome = null;
    descricao = null;
    categoria = null;

    static allForPrestador(prestador,cb) {
        const instance = Servico.make();

        Servico.db.then((connection) => {
           connection.all('SELECT * from ' + instance.getTableName() + ' WHERE prestador_id =' + prestador.getId(), (err, rows) => {
               const list = [];

               console.log(rows);
               for(let row of rows) {
                   list.push(Servico.make(row));
               }

               cb(list);
           });
        });
    }

    getTableName() {
        return 'servicos';
    }

    getFillable() {
        return [
            'nome',
            'descricao',
            'categoria',
            'prestador_id',
        ];
    }
}

module.exports = Servico;