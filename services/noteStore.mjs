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

    async delete(id, currentUser) {
        await this.db.update({_id: id, orderedBy: currentUser}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async get(id, currentUser) {
        return await this.db.findOne({_id: id, orderedBy : currentUser});
    }

    async all() {
        return await this.db.cfind().sort({ orderDate: -1 }).exec();
    }
}

export const noteStore = new NoteStore();
