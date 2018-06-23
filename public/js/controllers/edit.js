import {default as model} from '../model/noteModel.js';

// UI-Refs
let noteTitle = {};
let noteDescription = {};
let noteImportance = {};
let noteFinishDate = {};
let noteForm = {};
const main = document.querySelector('main');

// note service
const noteService = new model.NoteService();

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
};

// Controller
const editController = {
    renderUI: async function () {
        // render UI
        let note = await noteService.getNote(editController.idFromUrl());
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

            const note = new model.Note({
                title: noteTitle.value,
                description: noteDescription.value,
                importance: editModel.importance(),
                finishDate: noteFinishDate.value,
                createdDate: noteForm.dataset.createdDate,
                finsihed: noteForm.dataset.finished
            });

            if (noteForm.dataset.id) {
                noteService.updateNote(noteForm.dataset.id, note);
            }
            else {
                noteService.createNote(note);
            }

            // redirect to index.html
            window.location.href = 'index.html';
        });

        // add listener on cancel button
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
