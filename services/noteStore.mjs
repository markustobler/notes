import Datastore from 'nedb-promise'

export class Note {
    constructor(pizzaName, orderedBy) {
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(note) {
        //let note = new Note(pizzaName);
        return await this.db.insert(note);
    }

    async update(id, changes) {
        await this.db.update({_id: id}, {$set: changes});
        return await this.get(id);
    }

    async delete(id) {
        await this.db.remove({_id: id});
        return true;
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.cfind().sort({ orderDate: -1 }).exec();
    }
}

export const noteStore = new NoteStore();
