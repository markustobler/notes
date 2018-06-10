// classes
class Note {
    constructor({id, title, description, importance, finishDate, createdDate, finished = false}) {
        this.id = id;
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

    getNotes() {
        let notes = this.getNotesFromLocalStorage();
        notes = this.filterFinished(notes);
        notes = this.sortNotes(notes);
        return notes;
    }

    getNotesFromLocalStorage() {
        // get notes object from local storage and parse JSON or set new object
        return JSON.parse(localStorage.getItem('notes')) || {};
    }

    getNote(id) {
        const notes = this.getNotesFromLocalStorage();
        return notes[id];
    }

    deleteNote(id) {
        // get notes object from local storage
        let notes = this.getNotesFromLocalStorage();

        // add note to notes object with note.id as key
        delete notes[id];

        // parse notes object back to json and store it in local storage
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    saveNote(note) {
        const notes = this.getNotesFromLocalStorage();
        if (!note.id) {
            note.id = this.generateId();
            note.createdDate = moment();
            note.finished = false;
        }
        notes[note.id] = note;
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    generateId() {
        // create globally-unique identifier
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    toggleFinished(noteId) {
        let note = this.getNote(noteId);
        note.finished = !note.finished;
        this.saveNote(note);
    }

    filterFinished(notes) {
        let notesArray = Object.values(notes);
        notesArray = notesArray.map(note => new Note(note));

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


export default {NoteService, Note};
