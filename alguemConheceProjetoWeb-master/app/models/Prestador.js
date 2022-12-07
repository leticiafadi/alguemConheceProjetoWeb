const Base = require("./Base");
const Servico = require("./Servico");

class Prestador extends Base {
    id = null;
    nome = null;
    contato = null;
    cidade = null;
    estado = null;
    data_nascimento = null;

    getTableName() {
        return 'prestadores';
    }
    getFillable() {
        return [
            'nome',
            'contato',
            'cidade',
            'estado',
            'data_nascimento',
        ];
    }

    servicos(cb) {
        return Servico.allForPrestador(this, cb);
    }
}

module.exports = Prestador;