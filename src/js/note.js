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
        return JSON.parse(localStorage.getItem('notes')) || {};
    },

    getNote: (id) => {
        let allNotes = noteHelpers.getNotes();
        return allNotes[id];
    },


};