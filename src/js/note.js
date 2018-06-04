'use strict';

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

// helper functions
const noteHelpers = {
    getNotes: () => {
        let notes = noteHelpers.getNotesFromLocalStorage();
        notes = noteHelpers.filterFinished(notes);
        notes = noteHelpers.sortNotes(notes);

        return notes;
    },
    getNotesFromLocalStorage: function(){
        // get notes object from local storage and parse JSON or set new object
        return JSON.parse(localStorage.getItem('notes')) || {};
    },
    getNote: function (id) {
        const notes = noteHelpers.getNotesFromLocalStorage();

        //var note = notes.find(function (note) { return note.id === id; });
        return notes[id];
    },
    deleteNote: (id) => {
        // get notes object from local storage
        let notes = noteHelpers.getNotesFromLocalStorage();

        // add note to notes object with note.id as key
        delete notes[id];

        // parse notes object back to json and store it in local storage
        localStorage.setItem('notes', JSON.stringify(notes));
    },
    saveNote: function (note) {
        const notes = noteHelpers.getNotesFromLocalStorage();
        if (!note.id) {
            note.id = noteHelpers.generateId();
            note.createdDate = moment();
            note.finished = false;
        }
        notes[note.id] = note;
        localStorage.setItem('notes', JSON.stringify(notes));
    },
    generateId:function () {
        // create globally-unique identifier
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    },
    toggleFinished:function (noteId) {
        let note = noteHelpers.getNote(noteId);
        note.finished = !note.finished;
        noteHelpers.saveNote(note);
    },
    filterFinished: (notes) => {
        let notesArray = Object.values(notes);
        notesArray = notesArray.map(note => new Note(note));

        if (!noteHelpers.filterStatus) {
            return notesArray.filter(note => !note.finished);
        }

        return notesArray;
    },
    filterStatus: false,
    toggleFilter: () => {
        noteHelpers.filterStatus = !noteHelpers.filterStatus;
    },
    sortStatus: '',
    setSort: function (sort) {
        noteHelpers.sortStatus = sort;
    },
    sortNotes:function (notes) {
        let fn = () => {
        };
        if (noteHelpers.sortStatus === 'createdDate') {
            fn = (a, b) => {
                return moment(a.createdDate).isBefore(moment(b.createdDate));
            };
        } else if (noteHelpers.sortStatus === 'finishDate') {
            fn = (a, b) => {
                return moment(a.finishDate).isAfter(moment(b.finishDate));
            };
        } else if (noteHelpers.sortStatus === 'importance') {
            fn = (a, b) => {
                return a.importance < b.importance;
            };
        }
        return notes.sort(fn);
    }
};
