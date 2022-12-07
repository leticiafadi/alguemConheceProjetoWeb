class Base {
    #_attributes = [];
    #_id = null;
    #_exists = false;
    static db = require('../database');

    constructor(attributes = []) {
        this.#_attributes = attributes;
        if (this.#_attributes['id']) {
            this.#_id = this.#_attributes['id'];
            this.#_exists = true;
        }
    }

    static make(attributes = []) {
        let instance = new this(attributes);

        for(let attribute of Object.keys(attributes)) {
            instance[attribute] = attributes[attribute];
        }

        return instance;
    }

    async save() {
        const self = this;
        await Base.db.then((connection) => {
            if (!self.exists()) {
                connection.run('INSERT INTO ' + self.getTableName() + ' (' + self.getFillable().join(',') + ') VALUES (' + self.parseValuesToQuery() + ')', (err) => {
                    if (!err) {
                        self.#_id = this.lastID;
                    }

                    self.fresh();
                })
            } else {
                connection.run('UPDATE' + self.getTableName() + ' (' + self.getFillable().join(',') + ') VALUES (' + self.parseValuesToQuery() + ') WHERE id = '+ self.getId(), (err) => {
                    if (!err) {
                        self.fresh();
                    }
                })
            }
        })

        return this;
    }

    async fresh() {
        const self = this;

        await Base.db.then((connection) => {
            connection.all("SELECT * FROM "+ self.getTableName() +" where id = "+ self.getId(), function (err, row) {
                if(err){
                    throw err;
                }

                if (row.length > 0) {
                    row = row[0];
                }

                self.#_attributes = row;
            });

        })

        return this;
    }

    static  all(cb) {

        const model = this;
        const self = new model();
        Base.db.then((connection) => {
            connection.all("SELECT * FROM "+ self.getTableName() , function (err, rows) {
                if(err){
                    throw err;
                }

                if (rows.length > 0) {
                    const list = [];
                    for(let row of rows) {
                        let instance = model.make(row);
                        list.push(instance);
                    }
                    cb(list)

                }
            });
        }, (err) => cb(err))
    }

    static findById(id, cb) {
        const classModel = this;
        const self = classModel.make();
        Base.db.then((connection) => {
            connection.all("SELECT * FROM "+ self.getTableName() +" where id = "+ id , function (err, row) {
                if(err){
                    throw err;
                }

                if (row.length > 0) {
                    row = row[0];
                }

                cb(classModel.make(row));
            });
        })
    }

    getTableName() {
        return '';
    }

    parseValuesToQuery() {
        const atributes = this.getFillable();
        let value = [];

        for(let attribute of atributes) {
            if (attribute === 'id') {
                continue;
            }

            let val = this.#_attributes[attribute] ?? this[attribute];

            if (typeof val === 'string')  {
                val = '"'+ val +'"';
            }
            value.push();
        }

        return value.join(',');
    }

    getFillable() {
        return [];
    }

    getId() {
        return this.#_id ?? this['id'];
    }

    exists() {
        return this.getId() !== null;
    }

}

module.exports = Base;