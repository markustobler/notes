import restClient from '../services/restClient.js';

// classes
class NoteModel {
    constructor({_id, title, description, importance, finishDate, createdDate, finished = false}) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.finishDate = finishDate;
        this.createdDate = createdDate;
        this.finished = finished;
    }
}

class NoteService {

    constructor() {
        this.filterStatus = false;
        this.sortStatus = '';
    }

    async getNotes() {
        let notes = await this.getNotesFromStorage();
        notes = this.filterFinished(notes);
        notes = this.sortNotes(notes);
        return notes;
    }

    async getNotesFromStorage() {
        const notes = await restClient.getNotes();
        return notes;
    }

    async getNote(id) {
        return await restClient.getNote(id);
    }

    async deleteNote(id) {
        await restClient.deleteNote(id);
    }

    async createNote(note) {
        note.createdDate = moment();
        note.finished = false;
        await restClient.createNote(note);
    }

    async updateNote(id, note) {
        await restClient.updateNote(id, note);
    }


    async toggleFinished(noteId) {
        let note = await this.getNote(noteId);
        note.finished = !note.finished;
        await restClient.updateNote(noteId, note);
    }

    filterFinished(notes) {

        let notesArray = Object.values(notes);
        notesArray = notesArray.map(note => new NoteModel(note));

        if (!this.filterStatus) {
            return notesArray.filter(note => !note.finished);
        }
        return notesArray;
    }

    toggleFilter() {
        this.filterStatus = !this.filterStatus;
    }

    setSort(sort) {
        this.sortStatus = sort;
    }

    sortNotes(notes) {
        let fn = () => {
        };
        if (this.sortStatus === 'createdDate') {
            fn = (a, b) => {
                return moment(a.createdDate).isBefore(moment(b.createdDate));
            };
        } else if (this.sortStatus === 'finishDate') {
            fn = (a, b) => {
                return moment(a.finishDate).isAfter(moment(b.finishDate));
            };
        } else if (this.sortStatus === 'importance') {
            fn = (a, b) => {
                return a.importance < b.importance;
            };
        }
        return notes.sort(fn);
    }
}


export default {NoteService, Note: NoteModel};
