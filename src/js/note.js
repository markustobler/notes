'use strict';

// classes
class Note {
    constructor({id, title, description, importance, finishDate, createdDate, archived = false}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.finishDate = finishDate;
        this.createdDate = createdDate;
        this.archived = archived;
    }
}



// helper functions
const noteHelpers = {

    getNotes: () => {
        // get notes object from local storage and parse JSON or set new object
        return JSON.parse(localStorage.getItem('notes')) || {};
    },

    getNote: (id) => {
        let allNotes = noteHelpers.getNotes();
        return allNotes[id];
    },
    deleteNote: (id) => {
        // get notes object from local storage
        let notes = JSON.parse(localStorage.getItem('notes'));

        // add note to notes object with note.id as key
        delete notes[id];

        // parse notes object back to json and store it in local storage
        localStorage.setItem('notes', JSON.stringify(notes));
    },
    saveNote: function (note) {
        const notes = noteHelpers.getNotes();
        if (!note.id) {
            note.id = noteHelpers.generateId();
            note.createdDate = moment();
        }
        notes[note.id] = note;
        localStorage.setItem('notes', JSON.stringify(notes));
    },

    generateId:function () {
        // create globally-unique identifier
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );


    }


};