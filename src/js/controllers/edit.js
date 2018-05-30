'use strict';

// UI-Refs
let noteTitle = {};
let noteDescription = {};
let noteImportance = {};
let noteFinishDate = {};
let noteForm = {};
const main = document.querySelector('main');


// create globally-unique identifier
const uuidv4 = {
    id: () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
};


// app-state / model
const editModel = {

    importance: function(){

        // if no rating is checked return 0
        var selection = noteImportance.querySelector('input[name="star"]:checked') !== null;
        if (selection){
            return noteImportance.querySelector('input[name="star"]:checked').value;
        }
        else{
            return 0;
        }}
    ,

    saveNote: function () {
        const note = new Note({
            id: uuidv4.id(),
            title: noteTitle.value,
            description: noteDescription.value,
            importance: editModel.importance(),
            finishDate: noteFinishDate.value,
            createdDate: moment(),
            archived: false
        });


        // get notes object from local storage and parse JSON or set new object
        let notes = JSON.parse(localStorage.getItem('notes')) || {};

        // add note to notes object with note.id as key
        notes[note.id] = note;

        // parse notes object back to json and store it in local storage
        localStorage.setItem('notes', JSON.stringify(notes));

        // redirect to index.html
        window.location.href = 'index.html';

    }
};

// Controller
const editController = {
    renderUI: function () {
        // render UI
        let note = noteHelpers.getNote(editController.idFromUrl());
        let noteTemplate = document.getElementById('note-form').innerHTML;
        let renderNoteHTML = Handlebars.compile(noteTemplate);

        // set form into html
        main.innerHTML = renderNoteHTML(note);

        // form ui elements
        noteTitle = document.getElementById('title');
        noteDescription = document.getElementById('description');
        noteImportance = document.getElementById('importance');
        noteFinishDate = document.getElementById('finishDate');
        noteForm = document.getElementById('form');

        // register all listeners
        editController.registerListeners();


    },
    registerListeners: function () {
        // add listener submit button
        noteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            editModel.saveNote();
        });

        // add listener cancel button
        noteForm.addEventListener('reset', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    },
    idFromUrl: function () {
        let url = new URLSearchParams(window.location.search);
        return url.get('id');
    }
};

// init UI
editController.renderUI();
